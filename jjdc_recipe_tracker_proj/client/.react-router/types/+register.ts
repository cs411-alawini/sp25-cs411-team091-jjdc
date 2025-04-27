import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/register": {};
  "/recipe": {};
  "/searchRecipe/:RecipeID": {
    "RecipeID": string;
  };
};