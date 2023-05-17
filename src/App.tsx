import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { Login } from "./pages/Login";

const Welcome = ({ user }: { user: { uid: string } }) => {
  return (
    <div>
      <h1>Welcome {user.uid}</h1>
    </div>
  );
};


function App() {
  const [initialing, setInitialing] = useState(false);
  const [user, setUser] = useState<{uid: string }>();
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setInitialing(true)
      if (user) {
        setUser(user)
      }
      console.log("auth state changed", user);
    })
  }, [])
  if (!initialing) {
    return <div>Initialing...</div>
  }
  if (user) {
    return <Welcome user={user} />;
  } else {
    return <Login />;
  }
}

export default App;
