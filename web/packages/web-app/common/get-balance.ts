import { useContext, useState, useEffect } from 'react';
import { AppContext } from '@common/context';
import { getRPCClient } from './utils';
import { useSTXAddress } from './use-stx-address';

export const getBalance = () => {
  const stxAddress = useSTXAddress();
  const state = useContext(AppContext);
  const [balance, setBalance] = useState('');
  const client = getRPCClient();

  // interface BalanceResponse {
  //   txId?: string;
  //   success: boolean;
  // }

  useEffect(() => {
    const getBalance = async () => {
      if (stxAddress) {
        try {
          const { balance } = await client.fetchAccount(stxAddress);
          setBalance(balance.toString());
        } catch (error) {
          console.error('Unable to connect to Stacks Blockchain');
        }
      }
    };
    void getBalance();
  }, [state.userData]);

  return {
    balance,
  };
};
