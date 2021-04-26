(use-trait vault-manager-trait .vault-manager-trait.vault-manager-trait)
(use-trait auction-engine-trait .auction-engine-trait.auction-engine-trait)

;; errors
(define-constant ERR-LIQUIDATION-FAILED u51)
(define-constant ERR-EMERGENCY-SHUTDOWN-ACTIVATED u52)
(define-constant ERR-NO-LIQUIDATION-REQUIRED u53)
(define-constant ERR-NOT-AUTHORIZED u5401)
(define-constant STATUS-OK u5200)

(define-public (notify-risky-vault (vault-manager <vault-manager-trait>) (auction-engine <auction-engine-trait>) (vault-id uint))
  (let (
    (collateral-type (unwrap-panic (contract-call? vault-manager get-collateral-type-for-vault vault-id)))
    (collateral-to-debt-ratio (unwrap-panic (contract-call? vault-manager calculate-current-collateral-to-debt-ratio vault-id)))
    (liquidation-ratio (unwrap-panic (contract-call? .collateral-types get-liquidation-ratio collateral-type)))
  )
      (asserts! (is-eq (unwrap-panic (contract-call? .dao get-emergency-shutdown-activated)) false) (err ERR-EMERGENCY-SHUTDOWN-ACTIVATED))
      (asserts! (is-eq (contract-of vault-manager) (unwrap-panic (contract-call? .dao get-qualified-name-by-name "freddie"))) (err ERR-NOT-AUTHORIZED))
      (asserts! (is-eq (contract-of auction-engine) (unwrap-panic (contract-call? .dao get-qualified-name-by-name "auction-engine"))) (err ERR-NOT-AUTHORIZED))
      ;; Vault only at risk when liquidation ratio is < collateral-to-debt-ratio
      (asserts! (>= liquidation-ratio collateral-to-debt-ratio) (err ERR-NO-LIQUIDATION-REQUIRED))
      ;; Start auction
      (print "Vault is in danger. Time to liquidate.")
      (let 
        ((amounts (unwrap-panic (as-contract (contract-call? vault-manager liquidate vault-id)))))
          (unwrap! 
            (contract-call? auction-engine start-auction vault-id (get ustx-amount amounts) (get debt amounts)) 
            (err ERR-LIQUIDATION-FAILED))
          (ok STATUS-OK)
      )
  )
)
