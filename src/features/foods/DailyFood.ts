export interface DailyFood {
    day: number;
    meals: Meal[];
}

export interface Meal {
    kind: MealKind;
    foods: string[];
}

export enum MealKind {
    Breakfast = "breakfast",
    Lunch = "lunch",
    Dinner = "dinner",
}