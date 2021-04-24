(impl-trait .vault-trait.vault-trait)
(use-trait mock-ft-trait .mock-ft-trait.mock-ft-trait)

;; errors
(define-constant ERR-NOT-AUTHORIZED u9401)
(define-constant ERR-TRANSFER-FAILED u92)
(define-constant ERR-DEPOSIT-FAILED u95)
(define-constant ERR-WITHDRAW-FAILED u96)
(define-constant ERR-MINT-FAILED u97)

(define-read-only (calculate-xusd-count (token (string-ascii 12)) (ucollateral-amount uint) (collateral-type (string-ascii 12)))
  (let ((price-in-cents (contract-call? .oracle get-price token)))
    (let ((amount
      (/
        (* ucollateral-amount (get last-price-in-cents price-in-cents))
        (unwrap-panic (contract-call? .collateral-types get-collateral-to-debt-ratio collateral-type))
      )))
      (ok amount)
    )
  )
)

(define-read-only (calculate-current-collateral-to-debt-ratio (token (string-ascii 12)) (debt uint) (ucollateral uint))
  (let ((price-in-cents (contract-call? .oracle get-price token)))
    (if (> debt u0)
      (ok (/ (* ucollateral (get last-price-in-cents price-in-cents)) debt))
      (err u0)
    )
  )
)

;; (match (print (ft-transfer? token ucollateral-amount sender (as-contract tx-sender)))
(define-public (collateralize-and-mint (token <mock-ft-trait>) (ucollateral-amount uint) (debt uint) (sender principal))
  (begin
    (asserts! (is-eq contract-caller .freddie) (err ERR-NOT-AUTHORIZED))

    ;; token should be a trait e.g. 'SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB.arkadiko-token
    (match (contract-call? token transfer ucollateral-amount sender (as-contract tx-sender))
      success (ok debt)
      error (err ERR-TRANSFER-FAILED)
    )
  )
)

(define-public (deposit (token <mock-ft-trait>) (additional-ucollateral-amount uint))
  (begin
    (asserts! (is-eq contract-caller .freddie) (err ERR-NOT-AUTHORIZED))

    (match (contract-call? token transfer additional-ucollateral-amount tx-sender (as-contract tx-sender))
      success (ok true)
      error (err ERR-DEPOSIT-FAILED)
    )
  )
)

(define-public (withdraw (token <mock-ft-trait>) (vault-owner principal) (ucollateral-amount uint))
  (begin
    (asserts! (is-eq contract-caller .freddie) (err ERR-NOT-AUTHORIZED))

    (match (as-contract (contract-call? token transfer ucollateral-amount (as-contract tx-sender) vault-owner))
      success (ok true)
      error (err ERR-WITHDRAW-FAILED)
    )
  )
)

(define-public (mint (token (string-ascii 12)) (vault-owner principal) (ucollateral-amount uint) (current-debt uint) (extra-debt uint) (collateral-type (string-ascii 12)))
  (begin
    (asserts! (is-eq contract-caller .freddie) (err ERR-NOT-AUTHORIZED))

    (let ((max-new-debt (- (unwrap-panic (calculate-xusd-count token ucollateral-amount collateral-type)) current-debt)))
      (if (>= max-new-debt extra-debt)
        (match (as-contract (contract-call? .dao mint-token .xusd-token extra-debt vault-owner))
          success (ok true)
          error (err ERR-MINT-FAILED)
        )
        (err ERR-MINT-FAILED)
      )
    )
  )
)

(define-public (burn (token <mock-ft-trait>) (vault-owner principal) (collateral-to-return uint))
  (begin
    (asserts! (is-eq contract-caller .freddie) (err ERR-NOT-AUTHORIZED))

    (match (as-contract (contract-call? token transfer collateral-to-return (as-contract tx-sender) vault-owner))
      transferred (ok true)
      error (err ERR-TRANSFER-FAILED)
    )
  )
)

(define-public (redeem-collateral (token <mock-ft-trait>) (ucollateral uint) (owner principal))
  (begin
    (asserts! (is-eq contract-caller .freddie) (err ERR-NOT-AUTHORIZED))
    (as-contract (contract-call? token transfer ucollateral (as-contract tx-sender) owner))
  )
)

(define-public (mint-xstx (collateral uint))
  (begin
    (asserts! (is-eq contract-caller .freddie) (err ERR-NOT-AUTHORIZED))
    (contract-call? .dao mint-token .xstx-token collateral (as-contract tx-sender))
  )
)

;; redeem stx (and burn xSTX)
(define-public (burn-xstx (ustx-amount uint) (sender principal))
  (begin
    (asserts! (is-eq contract-caller .freddie) (err ERR-NOT-AUTHORIZED))
    (try! (contract-call? .dao burn-token .xstx-token  ustx-amount sender))
    (ok true)
  )
)
