import { useContext, useState, useEffect } from 'react';
import { AppContext } from '@common/context';
import { useSTXAddress } from './use-stx-address';
import { stacksNetwork as network } from '@common/utils';
import { callReadOnlyFunction, cvToJSON, standardPrincipalCV } from '@stacks/transactions';

export const getVault = () => {
  const stxAddress = useSTXAddress();
  const state = useContext(AppContext);
  const [vault, setVault] = useState({});

  useEffect(() => {
    const getVault = async () => {
      const vault = await callReadOnlyFunction({
        contractAddress: 'ST31HHVBKYCYQQJ5AQ25ZHA6W2A548ZADDQ6S16GP',
        contractName: "stx-reserve",
        functionName: "get-vault",
        functionArgs: [standardPrincipalCV(stxAddress || '')],
        senderAddress: stxAddress || '',
        network: network,
      });
      console.log(vault);      
      const json = cvToJSON(vault);
      setVault(json);
    };
    void getVault();
  }, [state.userData]);

  return {
    vault,
  };
};
