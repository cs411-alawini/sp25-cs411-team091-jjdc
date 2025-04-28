import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/register": {};
  "/login": {};
  "/logout": {};
  "/recipe": {};
  "/searchRecipe/:RecipeID": {
    "RecipeID": string;
  };
};