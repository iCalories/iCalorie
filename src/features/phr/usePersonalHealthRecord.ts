import { useEffect, useState } from "react";
import { PersonalHealthRecord } from "./PersonalHealthRecord";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useRequiredUser } from "../auth/UserContext";

export const usePersonalHealthRecord = () => {
  const [personalHealthRecord, setPersonalHealthRecord] =
    useState<PersonalHealthRecord | null>(null);
  const user = useRequiredUser();

  useEffect(() => {
    onSnapshot(doc(db, "PersonalHealthRecords", user.uid), (doc) => {
      if (doc.exists()) {
        setPersonalHealthRecord(doc.data() as PersonalHealthRecord);
      } else {
        setPersonalHealthRecord(null);
      }
    });
  }, []);

  return { personalHealthRecord, setPersonalHealthRecord };
};
