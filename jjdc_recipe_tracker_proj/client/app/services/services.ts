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
export const register = (userID: string, pass: string, username: string): Promise<User> => {
  console.log(BASE_URL);
  let newUser = {}
  return httpClient.post('/api/balancebites', {
    params: {
      userid: userID,
      password: pass,
      name: username,
    }
  }).then((response) => response.data);
}

// This is for sending the login info to the api to check if things match.
export const login = () => {
  httpClient.post('/api/balancebites', {
    
  })
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


