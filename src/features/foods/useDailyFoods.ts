import { useEffect, useState } from "react";
import { useRequiredUser } from "../auth/UserContext";
import { DailyFood } from "./DailyFood";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export const useDailyFoods = () => {
  const user = useRequiredUser();

  const [foods, setFoods] = useState<DailyFood[]>([]);

  useEffect(() => {
    const loadFoods = async () => {
      const docRef = doc(db, "DailyFoods", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFoods(docSnap.data().data as DailyFood[]);
      }
    };
    loadFoods();
  }, []);

  return { foods, setFoods };
};
