import { doc, setDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { Button } from "flowbite-react";
import { useRequiredUser } from "../features/auth/UserContext";
import { DailyFoods } from "../features/foods/DailyFoods";
import { PHRForm } from "../features/phr/PHRForm";
import {
  PersonalHealthRecord,
  getBMI,
  getBMR,
  getDailyCalories,
  getDailyFoodsPrompt,
} from "../features/phr/PersonalHealthRecord";
import { personalHealthRecordRepo } from "../features/phr/PersonalHealthRecordRepo";
import { usePersonalHealthRecord } from "../features/phr/usePersonalHealthRecord";
import { db, functions } from "../firebase";

type CompletionResult = {
  choices: {
    text: string;
  }[];
};

export const Welcome = () => {
  const user = useRequiredUser();
  const { personalHealthRecord: phr } = usePersonalHealthRecord();

  const handleSubmit = (values: PersonalHealthRecord) => {
    console.log("add phr", values);
    personalHealthRecordRepo.add(user.uid, values);
  };

  const handleGetDailyFoods = () => {
    if (!phr) return;

    const requestCompletion = httpsCallable<any, CompletionResult>(
      functions,
      "requestCompletion"
    );
    requestCompletion({
      model: "text-davinci-003",
      prompt: getDailyFoodsPrompt(phr),
      stream: false,
      max_tokens: 2000,
      temperature: 0.4,
    })
      .then((res) => {
        const comp = res.data.choices[0].text;
        const result = JSON.parse(comp);
        console.log("get daily foods successfully", result);
        setDoc(doc(db, "DailyFoods", user.uid), result);
      })
      .catch((err) => {
        console.log("get daily foods error", err);
      });
  };
  return (
    <div>
      {phr === null && <PHRForm onSubmit={handleSubmit} />}
      {/* Show phr information */}
      {phr && (
        <div>
          <h1>Personal Health Record</h1>
          <p>Age: {phr.age}</p>
          <p>Height: {phr.height}cm</p>
          <p>Weight: {phr.weight}kg</p>
          <p>MBR: {getBMR(phr)}kcal</p>
          <p>BMI: {getBMI(phr)}</p>
          <p>AF: {phr.activeFactor}</p>
          <p>TDEE: {getDailyCalories(phr)}</p>
          <Button onClick={handleGetDailyFoods}>Get daily foods</Button>
          <DailyFoods />
        </div>
      )}
    </div>
  );
};
