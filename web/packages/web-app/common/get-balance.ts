import { getRPCClient } from './utils';

export const fetchBalances = async (stxAddress: string) => {
  const client = getRPCClient();

  const account = await client.fetchBalances(stxAddress);
  console.log(account);
  return {
    xusd: account.xusd.toString(),
    diko: account.diko.toString(),
    stx: account.stx.toString()
  };
};
