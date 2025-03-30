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
FROM (
    SELECT nl.UserID, CAST(nl.Time AS DATE) AS CurrDate, nl.RecipeID
    FROM NutritionLog nl
    JOIN Recipes r ON nl.RecipeID = r.RecipeID
    WHERE nl.UserID = currUser AND r.Public = 1
) AS userRecipes
GROUP BY CurrDate;


For the purposes of our query, we replaced currUser with 'jattoenn', one of our current users. We note that this query only outputs 2 rows because user 'jattoenn' only has two entries in their nutrition log. This query is meant to return the number of public recipes made on a given date by a user, namely in our case, 'jattoenn'.

![image](https://github.com/user-attachments/assets/8d9da8c1-6173-44fa-bd90-7c05724042cd)



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

For the purposes of our query, we replaced currUser with 'jattoenn', one of our current users. This query returns null values for all columns because user 'jattoenn' has no entries on the current day (03/29/2025) in their nutrition log. This query is meant to return the average calories, carbohydrates, fats, and proteins an individual user has eaten in a given day, based on their recipe intake, adjusted by the quantities listed in the Ingredients table that go into the recipes.

![image](https://github.com/user-attachments/assets/f181dc3c-a916-4bac-9139-e528155f5373)


## Final Index Design
TODO - Everyone

Below we have grouped each SQL query and shown the output of each EXPLAIN ANALYZE command with the different indices, making final remarks for each query. We do not repeat the queries because we use the same numbering as above.

### 1. 

TODO

### 2. 

- Original Cost: 2.3

  ![image](https://github.com/user-attachments/assets/302aba0e-42ca-40a8-ab78-c1551055d18b)


- Single Index on NutritionLog.RecipeID: 2.3

  ![image](https://github.com/user-attachments/assets/4b1d8c7c-4d69-4acc-807d-97153bcc477a)
 


- Indices on both Recipes.Public and NutritionLog.RecipeID: 1.4

  ![image](https://github.com/user-attachments/assets/6c198816-7b98-43b4-a62a-17ba102e66c4)


- Single Index on Recipes.Public: 1.4

  ![image](https://github.com/user-attachments/assets/0c433537-079e-4c64-ac26-817427cd36cb)


- Best Index Design by Cost: Both the single index on Recipes.Public and the two indices on both Recipes.Public and NutritionLog.RecipeID have the same cost. However, one could choose the simpler index design of only Recipes.Public for simplicity/parsimony in case of future queries. However, time-wise, having both indices is slightly faster. Either choice could be made, depending on the other queries. 

### 3. 

TODO

### 4. 

TODO

### 5. 

TODO

### 6. 

- Original Cost: 12

  ![image](https://github.com/user-attachments/assets/7b0a265a-37a0-47d3-bfad-dfb20a98ffb9)


- Single Index on Foods.Calories: 12

  ![image](https://github.com/user-attachments/assets/9fa36ef5-f184-4315-b73a-c7b66b9a5f7f)

- Index on All Foods Attributes: 12

  ![image](https://github.com/user-attachments/assets/117629af-05a0-4eea-9675-ff7bb6a5459e)

- Index on Ingredients.Quantity: 10.5

  ![image](https://github.com/user-attachments/assets/d36eb85b-aa7d-4289-b8b1-d7b33590caa1)

- Best Index Design by Cost: We note that the best index design was the one only with Ingredients.Quantity. The others likely did not work well because their values did not depend on any others, while Ingredients.Quantity does depend on the Food(s) involved due to the foreign key relationship. Further testing may be required on this, but because of the other testing on Foods indices, it is likely that this index design is best for this type of query.

### Final Analysis
TODO
