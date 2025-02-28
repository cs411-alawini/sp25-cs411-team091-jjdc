# Conceptual and Logical Database Design

## UML Diagram

```mermaid
classDiagram
  class UserInfo {
      UserID [PK]
      Password
      Name
  }
  class Foods {
      FoodName [PK]
      Calories
      Fat
      Carbohydrates
      Protein
  }
  class Recipes {
      RecipeID [PK]
      Ingredients
      Name
      UserID
      Public
  }
  class NutritionLog {
      UserID [PK]
      Time [PK]
      RecipeID
  }
  class MealPlan {
      MealPlanID [PK]
      UserID
      Recipes
      Name
      Public
  }
UserInfo "1..1" -- "1..10" MealPlan : UserMealPlans
UserInfo "0..*" -- "0..*" NutritionLog : Logs
UserInfo "0..1" -- "0..10" Recipes : UserRecipes
NutritionLog "0..*" -- "0..*" MealPlan : MealPlanLogs
MealPlan "0..*" -- "1..*" Recipes : MealPlanRecipes
Recipes "0..*" -- "1..*" Foods : Ingredients
```
## Assumptions and Description of Entities and Relationships
TODO

## Normalization - 3NF

We will show our schema adheres to 3NF without any additional normalization. 

First, for UserInfo, the only functional dependencies (FDs) are UserID to Password and UserID to Name, when separating the FDs that have singletons on the right-hand side (RHS). This is because UserID is the intended key of this entity. Thus, since UserID determines all the other attributes, it is a superkey for UserInfo. Therefore, UserInfo is in 3NF.

Second, for Foods, the only functional dependencies are FoodName to Calories, FoodName to Carbohydrates, FoodName to Fat, and FoodName to Protein. We have not included a FD from (Carbohydrates, Fat, Protein) to Calories because two different foods could have the same macronutrients but different Calories, as Calories is not solely dependent on macronutrients (vitamins and minerals are also factors). We know FoodName has all these FDs because FoodName is the intended key of the Foods entity. Thus, since FoodName determines all the other attributes, it is a superkey for Foods. Therefore, Foods is in 3NF.
Third, for Recipes, the only FDs are RecipeID to Ingredients, RecipeID to Name, RecipeID to UserID, and RecipeID to Public. This is because RecipeID is the intended key of the Recipes entity, and thus given a RecipeID, we can uniquely identify the other attributes in said observation. We considered other FDs such as Ingredients to Name and Name to Ingredients, but these would not hold. For Ingredients to Name, imagine we have two different kinds of bread, each with the same recipe. They are different in Name because they are cooked in different ways and thus taste, smell, and even feel different. Therefore, this FD cannot hold. For Name to Ingredients, a similar situation occurs. Say we have two different observations for Tomato Soup, but one has garlic in the recipe and another does not. This is a very real occurrence in cooking and therefore violates this FD. Therefore, there are no other FDs other than those with RecipeID on the left-hand side (LHS). Since we can determine every other attribute given a RecipeID, RecipeID is thus a superkey and the assumptions for 3NF are fulfilled for the Recipes table.

Fourth, for NutritionLog, the only FD we have is (UserID, Time) to RecipeID. This is because (UserID, Time) is the intended key of the NutritionLog entity, and Time is registered as a DATETIME variable (therefore, completely unique). There are no other sensible FDs, as neither of UserID or Time alone can determine any of the other attributes; this holds similarly for RecipeID alone or for any other combination of the attributes. Thus, since (UserID, Time) determines every other attribute, (UserID, Time) is a superkey and thus NutritionLog is in 3NF.

Lastly, for MealPlan, the only FDs are MealPlanID to UserID, MealPlanID to Recipes, MealPlanID to Name, and MealPlanID to Public. These FDs come from the fact that MealPlanID is the intended key for the MealPlan entity. For any other possible FD, it is impossible to verify them as reasonable FDs as if we have two different values for the LHS of some FD, then they could very reasonably have the same value on the RHS of this FD. A good example of this is Recipes to Name; one set of recipes could contain tomato soup and bread, while another could contain alfredo pasta and garlic bread, but the Name for both meal plans could be Bob (if a user were to name their meal plans strangely, that is). Thus, it is clear that no other FDs exist in this entity besides the ones from the key. Therefore, since a MealPlanID uniquely identifies each other attribute in the entity, MealPlanID is a superkey, finally giving that MealPlanID is in 3NF.

Our relationship-entities in the logical schema (such as MealPlanRecipes below) only contain the keys to link up their respective tables. Therefore, no normalization is necessary.

Therefore, by our initial construction of our database, each entity is in 3NF, which means the database is in 3NF as well. 

## Logical Design / Relational Schema

We separate our logical design below where each bullet point holds information about one table.

- UserInfo(UserID: VARCHAR(255) [PK],
Password: VARCHAR(255),
Name: VARCHAR(255))

- Logs(UserID: VARCHAR(255) [FK to UserInfo.UserID] [PK],
			Time: DATETIME [FK to NutritionLog.Time]  [PK])
  
- NutritionLog(UserID: VARCHAR(255) [PK],
		Time: DATETIME [PK],
		RecipeID: INT [FK to Recipes.RecipeID])
  
- MealPlanLogs(UserID: VARCHAR(255) [FK to NutritionLog.UserID] [PK],
			Time: DATETIME [FK to NutritionLog.Time] [PK],
			MealPlanID: INT [FK to MealPlan.MealPlanID] [PK])

- MealPlan(MealPlanID: INT [PK],
		UserID: VARCHAR(255) [FK to UserInfo.UserID],
		Recipes: VARCHAR(255),
		Name: VARCHAR(255),
		Public: Boolean)

- MealPlanRecipes(MealPlanID: INT [FK to MealPlan.MealPlanID] [PK],
			RecipeID: INT [FK to Recipes.RecipeID] [PK])

- Recipes(RecipeID: INT [PK],
		Ingredients: VARCHAR(255),
		Name: VARCHAR(255),
		UserID: (DEFAULT NULL) VARCHAR (255) [FK to UserInfo.UserID],
		Public: Boolean)

- Ingredients(RecipeID: INT [FK to Recipes.RecipeID] [PK],
			FoodName: VARCHAR(255) [FK to Foods.FoodName] [PK])

- Foods(FoodName: VARCHAR(255) [PK],
			Calories: INT,
			Fat: INT,
			Carbohydrates: INT,
			Protein INT)

