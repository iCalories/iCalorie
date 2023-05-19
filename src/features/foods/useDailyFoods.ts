import { useEffect, useState } from "react";
import { useRequiredUser } from "../auth/UserContext";
import { DailyFood } from "./DailyFood";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const useDailyFoods = () => {
  const user = useRequiredUser();

  const [foods, setFoods] = useState<DailyFood[]>([]);

  useEffect(() => {
    return onSnapshot(doc(db, "DailyFoods", user.uid), (doc) => {
      console.log("Current data exists: ", doc.exists());
      if (doc.exists()) {
        setFoods(doc.data().data as DailyFood[]);
      } else {
        setFoods([]);
      }
    });
  }, []);

  return { foods, setFoods };
};
