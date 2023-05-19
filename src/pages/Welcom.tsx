import { useEffect, useState } from "react";
import { useRequiredUser } from "../features/auth/UserContext";
import { PHRForm } from "../features/phr/PHRForm";
import {
  PersonalHealthRecord,
  getBMI,
  getBMR,
  getDailyCalories,
  getDailyFoodsPrompt,
} from "../features/phr/PersonalHealthRecord";
import { personalHealthRecordRepo } from "../features/phr/PersonalHealthRecordRepo";
import { onSnapshot } from "firebase/firestore";
import { Button } from "flowbite-react";
import { httpsCallable } from "firebase/functions";
import { functions, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { DailyFoods } from "../features/foods/DailyFoods";
import { DailyFood } from "../features/foods/DailyFood";

type CompletionResult = {
  choices: {
    text: string;
  }[];
};

export const Welcome = () => {
  const user = useRequiredUser();
  const [phr, setPhr] = useState<PersonalHealthRecord | null>(null);

  useEffect(() => {
    personalHealthRecordRepo.getByUserId(user.uid).then((phr) => {
      if (phr) {
        setPhr(phr);
      }
    });
  }, []);

  const handleSubmit = (values: PersonalHealthRecord) => {
    console.log("values", values);
    personalHealthRecordRepo.add(user.uid, values);
    setPhr(values);
  };

  const handleGetDailyFoods = (setFoods: (foods: DailyFood[]) => void) => {
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
        setFoods(result.data);
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

          <DailyFoods
            renderFooter={({ setFoods }) => (
              <Button onClick={() => handleGetDailyFoods(setFoods)}>
                Get daily foods
              </Button>
            )}
          />
        </div>
      )}
    </div>
  );
};
