;; errors
(define-constant err-liquidation-failed u1)
(define-constant stx-liquidation-reserve 'S02J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKPVKG2CE)

;; TODO: only callable by a registered stacker?
(define-public (notify-risky-vault (vault-id uint))
  (let ((collateral-to-debt-ratio (unwrap-panic (contract-call? .freddie calculate-current-collateral-to-debt-ratio vault-id))))
    (let ((liquidation-ratio (unwrap-panic (contract-call? .stx-reserve get-liquidation-ratio))))
      (if (>= liquidation-ratio collateral-to-debt-ratio)
        (begin
          (print "Vault is in danger. Time to liquidate.")
          (let ((amounts (unwrap-panic (as-contract (contract-call? .freddie liquidate vault-id)))))
            (if (unwrap-panic (contract-call? .auction-engine start-auction vault-id (get ustx-amount amounts) (get debt amounts)))
              (ok true)
              (err err-liquidation-failed)
            )
          )
        )
        (ok true) ;; false alarm - vault is not at risk. just return successful response
      )
    )
  )
)
