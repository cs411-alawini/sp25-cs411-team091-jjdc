import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3007'; // process.env.REACT_APP_API_BASE_URL 


export interface User {
  UserID: string;
  Password: string;
  Name: string;
}

export interface Recipe {
  RecipeID: number;
  Name: string;
  UserID: string;
  Public: boolean;
}

export interface Ingredients {
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

export interface MealPlan{
  MealPlanID: number;
  UserID: string;
  Name: string;
  Public: boolean;
}



export const httpClient = axios.create({
    baseURL: BASE_URL,
    headers: {
    'Content-Type': 'application/json',
    },
});


export const searchUserData = (query: string): Promise<User[]> => {
    console.log(BASE_URL);
    console.log("heeyyy")
    return httpClient
      .get(`/api/balancebites`, {
        params: { search: query },
      })
      .then((response) => response.data);
};

// just use a simple axios.post?
// this is for sending the registering request to the api
export const register = (userID: string, pass: string, username: string): Promise<void> => {
  console.log(BASE_URL);
  let newUser: User = { 
    UserID: userID, 
    Password: pass,
    Name: username};
  console.log(newUser)
  return httpClient.post('/api/balancebites/register', newUser).then((response) => response.data);
}

// This is for sending the login info to the api to check if things match.
export const login = (userID: string, pass: string): Promise<User[]> => {
  console.log("logging in user")
  return httpClient.post('/api/balancebites/login', {
    UserID: userID,
    Password: pass,
  }).then((response) => response.data);
}

export const searchRecipeData = (query: string): Promise<Recipe[]> => {
  console.log(BASE_URL);
  // console.log("heeyyy")
  return httpClient
    .get(`/api/recipe`, {
      params: { search: query },
    })
    .then((response) => response.data);
};

export const getRecipeByID = (id: number): Promise<Recipe> => {
  return httpClient
      .get(`/api/recipe/${id}`)
      .then((response) => {
        console.log("API raw response:", response.data);
        return response.data;
      });
};

export const getFoodsInRecipeByID = (id: number): Promise<Ingredients[]> => {
  return httpClient
      .get(`/api/recipe/ingredients/${id}`)
      .then((response) => {
        console.log("API raw response:", response.data);
        return response.data;
      });
};

export const getNutritionsInRecipeByID = (id: number): Promise<Nutritions> => {
  return httpClient
      .get(`/api/recipe/nutritions/${id}`)
      .then((response) => {
        console.log("API raw response:", response.data);
        return response.data;
      });
};

export const addrecipe = (recipeid: number, name: string, userid: string, publicr: boolean): Promise<void> => {
  console.log(BASE_URL);
  let NewRecipe: Recipe = { 
    RecipeID: recipeid,
    Name: name,
    UserID: userid, 
    Public: publicr};
  console.log(NewRecipe)
  return httpClient.post('/api/recipe/addrecipe', NewRecipe).then((response) => response.data);
}

export const getMaxRecipeByID = (): Promise<number> => {
  return httpClient
      .get(`/api/recipe/maxrecipe`)
      .then((response) => {
        console.log("API raw response:", response.data);
        return response.data;
      });
};


export const getAllFoodName = (): Promise<string[]> => {
  return httpClient
      .get(`/api/recipe/allfood`)
      .then((response) => {
        console.log("API raw response:", response.data);
        return response.data;
      });
};

export const getUserMealPlanByID = (id: string): Promise<MealPlan[]> => {
  return httpClient
      .get(`/api/balancebites/mealplan`, {
        params: { search: id },
      })
      .then((response) => {
        console.log("API raw response:", response.data);
        return response.data;
      });
};

export const getMealPlanByID = (id: number): Promise<MealPlan[]> => {
  return httpClient
      .get(`/api/balancebites/mealplan/${id}`)
      .then((response) => {
        console.log("API raw response:", response.data);
        return response.data;
      });
};

export const getRecipeByMealPlanID = (id: number): Promise<Recipe[]> => {
  return httpClient
      .get(`/api/balancebites/mealplan/recipe/${id}`)
      .then((response) => {
        console.log("API raw response:", response.data);
        return response.data;
      });
};
