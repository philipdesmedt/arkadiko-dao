;; (impl-trait .vault-trait.vault-trait)

;; addresses
(define-constant stx-reserve-address 'ST31HHVBKYCYQQJ5AQ25ZHA6W2A548ZADDQ6S16GP)
(define-constant stx-liquidation-reserve 'S02J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKPVKG2CE)

;; errors
(define-constant err-unauthorized u1)
(define-constant err-transfer-failed u2)
(define-constant err-minter-failed u3)
(define-constant err-burn-failed u4)
(define-constant err-deposit-failed u5)
(define-constant err-withdraw-failed u6)
(define-constant err-mint-failed u7)

;; risk parameters
(define-data-var liquidation-ratio uint u150)
(define-data-var collateral-to-debt-ratio uint u200)
(define-data-var maximum-debt uint u100000000)
(define-data-var liquidation-penalty uint u13)
(define-data-var stability-fee uint u0)

(define-read-only (get-risk-parameters)
  (ok (tuple
    (liquidation-ratio (var-get liquidation-ratio))
    (collateral-to-debt-ratio (var-get collateral-to-debt-ratio))
    (maximum-debt (var-get maximum-debt))
    (liquidation-penalty (var-get liquidation-penalty))
    (stability-fee (var-get stability-fee))
    )
  )
)

(define-read-only (get-liquidation-ratio)
  (ok (var-get liquidation-ratio))
)

(define-read-only (get-collateral-to-debt-ratio)
  (ok (var-get collateral-to-debt-ratio))
)

(define-read-only (get-maximum-debt)
  (ok (var-get maximum-debt))
)

(define-read-only (get-liquidation-penalty)
  (ok (var-get liquidation-penalty))
)

;; setters accessible only by DAO contract
(define-public (set-liquidation-ratio (ratio uint))
  (if (is-eq contract-caller 'ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH.dao)
    (begin
      (var-set liquidation-ratio ratio)
      (ok (var-get liquidation-ratio))
    )
    (ok (var-get liquidation-ratio))
  )
)

(define-public (set-collateral-to-debt-ratio (ratio uint))
  (if (is-eq contract-caller 'ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH.dao)
    (begin
      (var-set collateral-to-debt-ratio ratio)
      (ok (var-get collateral-to-debt-ratio))
    )
    (ok (var-get collateral-to-debt-ratio))
  )
)

(define-public (set-maximum-debt (debt uint))
  (if (is-eq contract-caller 'ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH.dao)
    (begin
      (var-set maximum-debt debt)
      (ok (var-get maximum-debt))
    )
    (ok (var-get maximum-debt))
  )
)

(define-public (set-liquidation-penalty (penalty uint))
  (if (is-eq contract-caller 'ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH.dao)
    (begin
      (var-set liquidation-penalty penalty)
      (ok (var-get liquidation-penalty))
    )
    (ok (var-get liquidation-penalty))
  )
)

;; MAIN LOGIC

;; calculate the amount of stablecoins to mint, based on posted STX amount
;; ustx-amount * stx-price-in-cents == dollar-collateral-posted-in-cents
;; (dollar-collateral-posted-in-cents / collateral-to-debt-ratio) == stablecoins to mint
(define-read-only (calculate-xusd-count (ustx-amount uint))
  (let ((stx-price-in-cents (contract-call? .oracle get-price)))
    (let ((amount (/ (* ustx-amount (get price stx-price-in-cents)) (var-get collateral-to-debt-ratio))))
      (ok amount)
    )
  )
)

(define-read-only (calculate-current-collateral-to-debt-ratio (debt uint) (ustx uint))
  (let ((stx-price-in-cents (contract-call? .oracle get-price)))
    (if (> debt u0)
      (ok (/ (* ustx (get price stx-price-in-cents)) debt))
      (err u0)
    )
  )
)

;; accept collateral in STX tokens
;; save STX in stx-reserve-address
;; calculate price and collateralisation ratio
(define-public (collateralize-and-mint (ustx-amount uint) (sender principal))
  (let ((debt (unwrap-panic (calculate-xusd-count ustx-amount))))
    (match (print (stx-transfer? ustx-amount sender (as-contract tx-sender)))
      success (match (print (as-contract (contract-call? .xusd-token mint debt sender)))
        transferred (ok debt)
        error (err err-transfer-failed)
      )
      error (err err-minter-failed)
    )
  )
)

;; deposit extra collateral in vault
;; TODO: assert that tx-sender == vault owner
(define-public (deposit (additional-ustx-amount uint))
  (match (print (stx-transfer? additional-ustx-amount tx-sender (as-contract tx-sender)))
    success (ok true)
    error (err err-deposit-failed)
  )
)

;; withdraw collateral (e.g. if collateral goes up in value)
;; TODO: assert that tx-sender == vault owner
;; TODO: make sure not more is withdrawn than collateral-to-debt-ratio
;; TODO: make sure ustx-amount < stx-collateral in vault (and is positive)
(define-public (withdraw (vault-owner principal) (ustx-amount uint))
  (match (print (as-contract (stx-transfer? ustx-amount (as-contract tx-sender) vault-owner)))
    success (ok true)
    error (err err-withdraw-failed)
  )
)

;; mint new tokens when collateral to debt allows it (i.e. > collateral-to-debt-ratio)
(define-public (mint (vault-owner principal) (ustx-amount uint) (current-debt uint) (extra-debt uint))
  (let ((max-new-debt (- (unwrap-panic (calculate-xusd-count ustx-amount)) current-debt)))
    (if (>= max-new-debt extra-debt)
      (match (print (as-contract (contract-call? .xusd-token mint extra-debt vault-owner)))
        success (ok true)
        error (err err-mint-failed)
      )
      (err err-mint-failed)
    )
  )
)

;; burn stablecoin to free up STX tokens
;; method assumes position has not been liquidated
;; and thus collateral to debt ratio > liquidation ratio
;; TODO: assert that tx-sender owns the vault
(define-public (burn (vault-owner principal) (debt-to-burn uint) (collateral-to-return uint))
  (match (print (as-contract (contract-call? .xusd-token burn debt-to-burn vault-owner)))
    success (match (print (as-contract (stx-transfer? collateral-to-return (as-contract tx-sender) vault-owner)))
      transferred (ok true)
      error (err err-transfer-failed)
    )
    error (err err-burn-failed)
  )
)

;; liquidate a vault-address' vault
;; should only be callable by the liquidator smart contract address
;; the xUSD in the vault need to be covered & burnt
;; by xUSD earned through auctioning off the collateral in the current vault
;; 1. Mark vault as liquidated?
;; 2. Send collateral into the liquidator's liquidation reserve
(define-public (liquidate (stx-collateral uint) (current-debt uint))
  (if (is-eq contract-caller 'ST31HHVBKYCYQQJ5AQ25ZHA6W2A548ZADDQ6S16GP.freddie)
    (begin
      (match (as-contract (stx-transfer? stx-collateral (as-contract tx-sender) stx-liquidation-reserve))
        success (begin
          (let ((new-debt (/ (* (var-get liquidation-penalty) current-debt) u100)))
            (ok (tuple (ustx-amount stx-collateral) (debt (+ new-debt current-debt))))
          )
        )
        error (err err-transfer-failed)
      )
    )
    (err err-unauthorized)
  )
)
