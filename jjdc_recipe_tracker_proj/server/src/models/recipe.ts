export interface Recipe {
    RecipeID: number;
    Name: string;
    UserID: string;
    Public: boolean;
}

export interface Ingredients{
    RecipeID: number;
    FoodName: string;
    Quantity: number;
}

export interface Nutritions{
    sumCalories: number;
    sumFat: number;
    sumCarbohydrates: number;
    sumProtein: number;
}

export interface Log{
    UserID: string;
    Time: Date;
    RecipeID: number;
}

export interface maxID{
    maxID: number;
}
