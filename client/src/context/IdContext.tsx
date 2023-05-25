import { createContext, useContext } from "react";

export interface IdContextType {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

export const IdContext = createContext<IdContextType | undefined>(undefined);

export const useUserId = (): IdContextType => {
  const context = useContext(IdContext);
  if(!context) {
    throw new Error('useUserId must be used within an AuthProvider')
  }
  return context;
}
