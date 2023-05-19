import { app } from "../../firebase";
import {
  Firestore,
  getFirestore,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { PersonalHealthRecord } from "./PersonalHealthRecord";

class PersonalHealthRecordRepo {
  private db: Firestore;
  constructor() {
    this.db = getFirestore(app);
  }

  async getByUserId(userId: string): Promise<PersonalHealthRecord | null> {
    const record = await getDoc(doc(this.db, "PersonalHealthRecords", userId));
    if (!record.exists()) {
      return null;
    }

    return record.data() as PersonalHealthRecord;
  }

  add(userId: string,record: PersonalHealthRecord): Promise<void> {
    return setDoc(doc(this.db, "PersonalHealthRecords", userId), record);
  }
}

export const personalHealthRecordRepo = new PersonalHealthRecordRepo();
