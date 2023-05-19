import { DailyFood } from "./DailyFood";
import { useDailyFoods } from "./useDailyFoods";

export const Foods = ({ foods }: { foods: DailyFood[] }) => {
  return (
    <p>
      {foods.map((food, index) => {
        return (
          <div key={index}>
            <p>{food.day}</p>
            <p>
              {food.meals.map((meal) => {
                return (
                  <div key={meal.kind}>
                    {meal.kind}: {meal.foods.join(";")}
                  </div>
                );
              })}
            </p>
          </div>
        );
      })}
    </p>
  );
};

export const DailyFoods = () => {
  const dailyFoods = useDailyFoods();
  return (
    <div>
      <h3>Daily Foods</h3>
      <Foods foods={dailyFoods.foods} />
    </div>
  );
};
