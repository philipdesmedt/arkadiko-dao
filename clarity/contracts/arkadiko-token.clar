(impl-trait 'SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB.mock-ft-trait.mock-ft-trait)

;; Defines the Arkadiko Governance Token according to the SRC20 Standard
(define-fungible-token diko)

;; errors
(define-constant err-unauthorized u1)

(define-read-only (get-total-supply)
  (ok (ft-get-supply diko))
)

(define-read-only (get-name)
  (ok "Arkadiko")
)

(define-read-only (get-symbol)
  (ok "DIKO")
)

(define-read-only (get-decimals)
  (ok u6)
)

(define-read-only (get-balance-of (account principal))
  (ok (ft-get-balance diko account))
)

;; TODO - finalize before mainnet deployment
(define-read-only (get-token-uri)
  (ok none)
)

(define-public (transfer (amount uint) (sender principal) (recipient principal))
  (begin
    (ft-transfer? diko amount sender recipient)
  )
)

;; TODO - finalize before mainnet deployment
(define-public (mint (amount uint) (recipient principal))
  (err err-unauthorized)
)

(define-public (burn (amount uint) (sender principal))
  (ok (ft-burn? diko amount sender))
)

;; Initialize the contract
(begin
  ;; mint 1 million tokens
  (try! (ft-mint? diko u990000000000 'S02J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKPVKG2CE))
  (try! (ft-mint? diko u10000000000 'ST1QV6WVNED49CR34E58CRGA0V58X281FAS1TFBWF))
)
