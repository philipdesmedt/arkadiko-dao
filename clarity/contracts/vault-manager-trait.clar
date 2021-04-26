(use-trait mock-ft-trait .mock-ft-trait.mock-ft-trait)
(use-trait vault-trait .vault-trait.vault-trait)

(define-trait vault-manager-trait
  (
    (get-stx-redeemable () (response uint bool))

    (get-collateral-type-for-vault (uint) (response (string-ascii 12) bool))
    (calculate-current-collateral-to-debt-ratio (uint) (response uint uint))

    (liquidate (uint) (response (tuple (ustx-amount uint) (debt uint)) uint))
    (finalize-liquidation (uint uint) (response bool uint))

    (redeem-auction-collateral (<mock-ft-trait> <vault-trait> uint principal) (response bool uint))

    (get-xusd-balance () (response uint bool))
  )
)
