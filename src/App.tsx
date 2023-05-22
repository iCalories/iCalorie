import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { Login } from "./pages/Login";
import { UserProvider } from "./features/auth/UserContext";
import { Welcome } from "./pages/Welcom";

function App() {
  const [initialing, setInitialing] = useState(true);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setInitialing(false);
      if (user) {
        setUser(user);
      }
      console.log("auth state changed", user);
    });
  }, []);
  if (initialing) {
    return <div>Initialing...</div>;
  }
  const node = user ? <Welcome /> : <Login />;
  return <UserProvider value={user}>{node}</UserProvider>;
}

export default App;
