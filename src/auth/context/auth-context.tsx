import { createContext } from 'react';

// ----------------------------------------------------------------------

export const AuthContext = createContext<any>(undefined);

export const AuthConsumer = AuthContext.Consumer;
