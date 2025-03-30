# Database Implementation and Indexing

## Data Definition Language (DDL) Commands

Below are the DDL Commands we used to make the tables in our database.

- CREATE TABLE UserInfo(
    UserID VARCHAR(255) PRIMARY KEY,
    Password VARCHAR(255),
    Name VARCHAR(255) );

- CREATE TABLE MealPlan(
    MealPlanID INT PRIMARY KEY,
    UserID VARCHAR(255),
    Name VARCHAR(255),
    Public BOOLEAN,
    FOREIGN KEY (UserID) REFERENCES UserInfo(UserID)
    ON DELETE CASCADE );

- CREATE TABLE Recipes(
    RecipeID INT PRIMARY KEY,
    Name VARCHAR(255),
    UserID VARCHAR(255) DEFAULT NULL,
    Public BOOLEAN,
    FOREIGN KEY (UserID) REFERENCES UserInfo(UserID)
    ON DELETE SET NULL );

- CREATE TABLE Foods(
    FoodName VARCHAR(255) PRIMARY KEY,
    Calories INT,
    Fat INT,
    Carbohydrates INT,
    Protein INT );

- CREATE TABLE NutritionLog(
    UserID VARCHAR(255) NOT NULL,
    Time DATETIME,
    RecipeID INT,
    PRIMARY KEY (UserID, Time),
    FOREIGN KEY (UserID) REFERENCES UserInfo(UserID)
    ON DELETE CASCADE,
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID)
    ON DELETE SET NULL );
  
- CREATE TABLE MealPlanRecipes(
    MealPlanID INT,
    RecipeID INT,
    PRIMARY KEY (MealPlanID, RecipeID),
    FOREIGN KEY (MealPlanID) REFERENCES MealPlan(MealPlanID)
    ON DELETE CASCADE,
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID)
    ON DELETE CASCADE );

- CREATE TABLE Ingredients(
    RecipeID INT,
    FoodName VARCHAR(255),
    PRIMARY KEY (RecipeID, FoodName),
    Quantity REAL NOT NULL,
    FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID)
    ON DELETE CASCADE,
    FOREIGN KEY (FoodName) REFERENCES Foods(FoodName)
    ON DELETE CASCADE );

### Screenshot of Tables

Below is a screenshot of our terminal connection within GCP of our database and its tables.

![Database Tables](https://github.com/user-attachments/assets/a815f24e-ce45-45ee-a83c-a779ee3d1ab2)


## Insertion Commands

Below are screenshots of four of our tables with over 1000 entries.

![foods](pics/CountFoods.PNG)

![UserInfo](pics/CountUserInfo.PNG)

![Recipes](pics/CountRecipes.PNG)

![image](https://github.com/user-attachments/assets/c1a19239-43ce-4792-9b35-20b44a005e5a)


## Advanced SQL Queries and Top 15 Rows
TODO - Dan and Jason - Provide Screenshots of top 15 rows.

Below are the commands used for each advanced SQL query as well as screenshots of the first 15 rows in the output.

1. SELECT SUM(Calories) AS sumCalories, SUM(Fat) AS sumFat, SUM(Carbohydrates) AS sumCarbohydrates, SUM(Protein) AS sumProtein
FROM Foods NATURAL JOIN (SELECT FoodName 
	FROM Ingredients
	WHERE RecipeID IN (SELECT RecipeID
		FROM MealPlanRecipes
		WHERE RecipeID = currRecipe AND MealPlanID = currMealPlan)) AS ingredientNames;

  

2. SELECT COUNT(RecipeID), CurrDate
FROM (SELECT UserID, CAST(Time AS DATE) AS CurrDate, RecipeID
	FROM NutritionLog
	WHERE UserID = currUser) AS userRecipes
GROUP BY CurrDate;



3. SELECT SUM(Calories) AS sumCalories, SUM(Fat) AS sumFat, SUM(Carbohydrates) AS sumCarbohydrates, SUM(Protein) AS sumProtein
FROM Foods NATURAL JOIN (SELECT FoodName 
	FROM Ingredients
	WHERE RecipeID IN (SELECT RecipeID
		FROM NutritionLog
		WHERE UserID = currUser AND (CAST(Time AS DATE) = CURRENT_DATE()))) AS userDailyRecipes;

  

4. SELECT COUNT(MealPlanID) as MealPlanCount, CurrDate
FROM (SELECT Name, MealPlanID, CAST(Time as DATE) AS CurrDate
	FROM MealPlan
	WHERE UserID = currUser) AS userMealPlans
GROUP BY CurrDate;



5. SELECT AVG(Calories) AS avgCalories, AVG(Fat) AS avgFat, AVG(Carbohydrates) AS avgCarbohydrates, AVG(Protein) AS avgProtein
FROM Foods NATURAL JOIN (SELECT FoodName 
	FROM Ingredients
	WHERE RecipeID IN (SELECT RecipeID
		FROM NutritionLog
		WHERE UserID = currUser AND (CAST(Time AS DATE) = CURRENT_DATE()))) AS userDailyAvg;

  

6. SELECT FoodName, COUNT(FoodName) as countIngredients
FROM MealPlan NATURAL JOIN MealPlanRecipes NATURAL JOIN Ingredients
WHERE UserID = currUser
GROUP BY FoodName
ORDER BY countIngredients DESC;



## Final Index Design
TODO - Everyone

Below we have grouped each SQL query and shown the output of each EXPLAIN ANALYZE command with the different indices, making final remarks for each query. We do not repeat the queries because we use the same numbering as above.

### 1. 

TODO

### 2. 

TODO

### 3. 

TODO

### 4. 

TODO

### 5. 

TODO

### 6. 

TODO

### Final Analysis
TODO
