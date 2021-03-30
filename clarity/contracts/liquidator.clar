;; errors
(define-constant err-liquidation-failed u1)
(define-constant confirm-action u200)

(define-public (notify-risky-vault (vault-id uint))
  (let ((collateral-to-debt-ratio (unwrap-panic (contract-call? .freddie calculate-current-collateral-to-debt-ratio vault-id .stx-reserve))))
    (let ((liquidation-ratio (unwrap-panic (contract-call? .dao get-liquidation-ratio "stx"))))
      (if (>= liquidation-ratio collateral-to-debt-ratio)
        (begin
          (print "Vault is in danger. Time to liquidate.")
          (let ((amounts (unwrap-panic (as-contract (contract-call? .freddie liquidate vault-id .stx-reserve)))))
            (if (unwrap-panic (contract-call? .auction-engine start-auction vault-id (get ustx-amount amounts) (get debt amounts)))
              (ok confirm-action)
              (err err-liquidation-failed)
            )
          )
        )
        (ok confirm-action) ;; false alarm - vault is not at risk. just return successful response
      )
    )
  )
)
