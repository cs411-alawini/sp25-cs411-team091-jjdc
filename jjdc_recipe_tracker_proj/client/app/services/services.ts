import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';


export const httpClient = axios.create({
    baseURL: BASE_URL,
    headers: {
    'Content-Type': 'application/json',
    },
});

export interface User {
    UserID: string;
    Password: string;
    Name: string;
}

export const searchUserData = (query: string): Promise<User[]> => {
    console.log(BASE_URL);
    return httpClient
      .get(`/api/balancebites`, {
        params: { search: query },
      })
      .then((response) => response.data);
};

