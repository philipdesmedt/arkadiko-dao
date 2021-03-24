import { createContext } from 'react';
import { UserSession, AppConfig, UserData } from '@stacks/auth';
import { VaultProps } from '@components/vault';

interface UserBalance {
  stx: number;
  xusd: number;
  diko: number;
}

interface RiskParameters {
  'stability-fee': number;
  'liquidation-ratio': number;
  'liquidation-penalty': number;
  'collateral-to-debt-ratio': number;
  'maximum-debt': number;
}

export interface AppState {
  userData: UserData | null;
  balance: UserBalance;
  vaults: VaultProps[];
  riskParameters: RiskParameters;
  isStacker: boolean;
}

export const defaultRiskParameters = () => {
  return { 'stability-fee': 0, 'liquidation-ratio': 0, 'liquidation-penalty': 0, 'collateral-to-debt-ratio': 0, 'maximum-debt': 0 };
};

export const defaultBalance = () => {
  return { stx: 0, xusd: 0, diko: 0 };
};

export const defaultState = (): AppState => {
  const appConfig = new AppConfig(['store_write'], document.location.href);
  const userSession = new UserSession({ appConfig });

  if (userSession.isUserSignedIn()) {
    return {
      userData: userSession.loadUserData(),
      balance: defaultBalance(),
      vaults: [],
      riskParameters: defaultRiskParameters(),
      isStacker: false
    };
  }

  return {
    userData: null,
    balance: { stx: 0, xusd: 0, diko: 0 },
    vaults: [],
    riskParameters: defaultRiskParameters(),
    isStacker: false
  };
};

export const AppContext = createContext<AppState>(defaultState());
