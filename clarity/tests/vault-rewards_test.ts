import {
  Account,
  Chain,
  Clarinet,
  Tx,
  types,
} from "https://deno.land/x/clarinet@v0.6.0/index.ts";


Clarinet.test({
  name: "vault-rewards: vault DIKO rewards",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet_1 = accounts.get("wallet_1")!;
    let block = chain.mineBlock([
      
      Tx.contractCall("oracle", "update-price", [
        types.ascii("STX"),
        types.uint(77),
      ], deployer.address),
      Tx.contractCall("freddie", "collateralize-and-mint", [
        types.uint(5000000),
        types.uint(1925000),
        types.principal(deployer.address),
        types.ascii("STX-A"),
        types.ascii("STX"),
        types.principal("STSTW15D618BSZQB85R058DS46THH86YQQY6XCB7.stx-reserve"),
        types.principal(
          "STSTW15D618BSZQB85R058DS46THH86YQQY6XCB7.arkadiko-token",
        ),
      ], deployer.address),
    ]);

    // Check rewards
    let call = chain.callReadOnlyFn("vault-rewards", "get-pending-rewards", [types.principal(deployer.address)], deployer.address);
    call.result.expectOk().expectUint(320000000)
    
    chain.mineEmptyBlock(1);

    call = chain.callReadOnlyFn("vault-rewards", "get-pending-rewards", [types.principal(deployer.address)], deployer.address);
    call.result.expectOk().expectUint(640000000)

    call = chain.callReadOnlyFn("vault-rewards", "calculate-cumm-reward-per-collateral", [], deployer.address);
    call.result.expectUint(128000000)

    chain.mineEmptyBlock((6*7*144)-5);

    // Need a write action to update the cumm reward 
    block = chain.mineBlock([
      Tx.contractCall("freddie", "collateralize-and-mint", [
        types.uint(500000),
        types.uint(192500),
        types.principal(wallet_1.address),
        types.ascii("STX-A"),
        types.ascii("STX"),
        types.principal("STSTW15D618BSZQB85R058DS46THH86YQQY6XCB7.stx-reserve"),
        types.principal(
          "STSTW15D618BSZQB85R058DS46THH86YQQY6XCB7.arkadiko-token",
        ),
      ], wallet_1.address),
    ]);
    
    call = chain.callReadOnlyFn("vault-rewards", "calculate-cumm-reward-per-collateral", [], deployer.address);
    call.result.expectUint(240334197063)

    // Almost all rewards - 1.2m
    call = chain.callReadOnlyFn("vault-rewards", "get-pending-rewards", [types.principal(deployer.address)], deployer.address);
    call.result.expectOk().expectUint(1201670985315)
  },
});

Clarinet.test({
  name: "vault-data: claim DIKO rewards",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    let deployer = accounts.get("deployer")!;
    let wallet_1 = accounts.get("wallet_1")!;

    let block = chain.mineBlock([
      
      Tx.contractCall("oracle", "update-price", [
        types.ascii("STX"),
        types.uint(77),
      ], deployer.address),
      Tx.contractCall("freddie", "collateralize-and-mint", [
        types.uint(5000000),
        types.uint(1925000),
        types.principal(deployer.address),
        types.ascii("STX-A"),
        types.ascii("STX"),
        types.principal("STSTW15D618BSZQB85R058DS46THH86YQQY6XCB7.stx-reserve"),
        types.principal(
          "STSTW15D618BSZQB85R058DS46THH86YQQY6XCB7.arkadiko-token",
        ),
      ], deployer.address),
    ]);

    chain.mineEmptyBlock(30);

    let call = chain.callReadOnlyFn("arkadiko-token", "get-balance-of", [types.principal(deployer.address)], deployer.address);
    call.result.expectOk().expectUint(890000000000);   

    call = chain.callReadOnlyFn("vault-rewards", "get-pending-rewards", [types.principal(deployer.address)], deployer.address);
    call.result.expectOk().expectUint(9920000000)

    call = chain.callReadOnlyFn("vault-rewards", "claim-pending-rewards", [], deployer.address);
    call.result.expectOk().expectUint(9920000000)

    call = chain.callReadOnlyFn("arkadiko-token", "get-balance-of", [types.principal(deployer.address)], deployer.address);
    call.result.expectOk().expectUint(899920000000);  

  },
});
