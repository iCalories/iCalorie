import { User } from "firebase/auth";
import { createContext, useContext } from "react";

const UserContext = createContext<User | undefined>(undefined);

export const UserProvider = UserContext.Provider;

export const useUser = () => useContext(UserContext);

// 返回的user一定不为undefined，如果为undefined，就会报错
export const useRequiredUser = () => {
  const user = useUser();
  if (!user) {
    throw new Error("user is undefined");
  }
  return user;
};
