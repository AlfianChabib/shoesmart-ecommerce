'use client';

import { type ReactNode, createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthService } from '@/services/auth-service';
import { initialSession } from '@/constants/session';

export interface SessionData {
  isAuthenticated: boolean;
  userId: string;
  username: string;
  email: string;
  avatarUrl: string;
  role: string;
}

export const CurrentSessionContext = createContext<SessionData | undefined>(initialSession);

export const useSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: async (): Promise<SessionData> => {
      return await AuthService.getSession();
    },
  });
};

export default function SessionProvider({ children }: Readonly<{ children: ReactNode }>) {
  const { data: session, isLoading } = useSession();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <CurrentSessionContext.Provider value={session}>{children}</CurrentSessionContext.Provider>;
}

export const useCurrentSession = (): SessionData => {
  if (!useContext(CurrentSessionContext)) {
    throw new Error('useCurrentSession must be used within a CurrentSessionContextProvider');
  }
  return useContext(CurrentSessionContext) as SessionData;
};
