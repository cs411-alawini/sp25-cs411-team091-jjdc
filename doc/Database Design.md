# Data Definition Language (DDL) Commands
TODO
- CREATE TABLE UserInfo(UserID VARCHAR(255), Password VARCHAR(255), Name VARCHAR(255));

- CREATE TABLE NutritionLog(UserID VARCHAR(255), Time DATETIME, RecipeID INT);

- CREATE TABLE MealPlan(MealPlanID INT, UserID VARCHAR(255), Recipes VARCHAR(255), Name VARCHAR(255), Public BOOLEAN);

- CREATE TABLE MealPlanRecipes(MealPlanID INT, RecipeID INT);

- CREATE TABLE Recipes(RecipeID INT, Ingredients VARCHAR(255), Name VARCHAR(255), UserID (DEFAULT NULL) VARCHAR (255), Public BOOLEAN);

- CREATE TABLE Ingredients(RecipeID: INT, FoodName: VARCHAR(255));

- CREATE TABLE Foods(FoodNameVARCHAR(255), Calories INT, Fat INT, Carbohydrates INT, Protein INT);

# Insertion Commands
TODO
# Advanced SQL Queries
TODO
## Top 15 Rows of Each Query
TODO
# Final Index Design
TODO
