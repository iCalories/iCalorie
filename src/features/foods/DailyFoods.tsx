import { DailyFood } from "./DailyFood";
import { useDailyFoods } from "./useDailyFoods";

export const Foods = ({ foods }: { foods: DailyFood[] }) => {
  return (
    <div>
      {foods.map((food, index) => {
        return (
          <div key={index}>
            <h3>{food.day}</h3>
            <section>
              {food.meals.map((meal) => {
                return (
                  <div key={meal.kind}>
                    {meal.kind}: {meal.foods.join(";")}
                  </div>
                );
              })}
            </section>
          </div>
        );
      })}
    </div>
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
