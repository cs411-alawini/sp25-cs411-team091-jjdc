# Advanced Database Programs Code

## Stored Procedure:
DELIMITER //

CREATE PROCEDURE GetUserNutritionStats(IN inUserID VARCHAR(255))
BEGIN
    -- Today's total macros
    SELECT 
        SUM(Foods.Calories * Ingredients.Quantity) AS TotalCalories,
        SUM(Foods.Fat * Ingredients.Quantity) AS TotalFat,
        SUM(Foods.Carbohydrates * Ingredients.Quantity) AS TotalCarbohydrates,
        SUM(Foods.Protein * Ingredients.Quantity) AS TotalProtein
    FROM Ingredients
    NATURAL JOIN Foods
    WHERE Ingredients.RecipeID IN (
        SELECT RecipeID
        FROM NutritionLog
        WHERE UserID = inUserID
          AND DATE(Time) = CURRENT_DATE()
    );

    -- Weekly average macros
    SELECT 
        AVG(Foods.Calories * Ingredients.Quantity) AS AvgCalories,
        AVG(Foods.Fat * Ingredients.Quantity) AS AvgFat,
        AVG(Foods.Carbohydrates * Ingredients.Quantity) AS AvgCarbohydrates,
        AVG(Foods.Protein * Ingredients.Quantity) AS AvgProtein
    FROM Ingredients
    NATURAL JOIN Foods
    WHERE Ingredients.RecipeID IN (
        SELECT RecipeID
        FROM NutritionLog
        WHERE UserID = inUserID
          AND DATE(Time) >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
    );
END //

DELIMITER ;

## Transaction:
DELIMITER //

CREATE PROCEDURE CreateMealPlanTransaction(
    IN p_UserID VARCHAR(255),
    IN p_Name VARCHAR(255),
    IN p_Public BOOLEAN,
    IN inRecipeID1 INT,
    IN inRecipeID2 INT
)

BEGIN
    DECLARE mealplan_count INT DEFAULT 0;
    DECLARE nextMealPlanID INT;

-- Find the highest MealPlanID and increment it
    SELECT IFNULL(MAX(MealPlanID), 0) + 1 INTO nextMealPlanID FROM MealPlan;


    -- Start the transaction
    START TRANSACTION;

    -- Insert new MealPlan
    INSERT INTO MealPlan (MealPlanID, UserID, Name, Public)
    VALUES (nextMealPlanID, p_UserID, p_Name, p_Public);

  -- Insert recipes into MealPlanRecipes
    INSERT INTO MealPlanRecipes (MealPlanID, RecipeID)
    VALUES (nextMealPlanID, inRecipeID1),
                   (nextMealPlanID, inRecipeID2),


    -- First Advanced Query: Calculate total calories and average protein for the recipes in the meal plan
    SELECT 
        SUM(Foods.Calories * Ingredients.Quantity) AS TotalCalories,
        AVG(Foods.Protein * Ingredients.Quantity) AS AvgProtein
    FROM Ingredients
    JOIN Foods ON Ingredients.FoodName = Foods.FoodName
    WHERE Ingredients.RecipeID IN (
        SELECT RecipeID
        FROM MealPlanRecipes
        WHERE MealPlanID = nextMealPlanID
    );

    -- Second Advanced Query: Calculate total number of ingredients and average number of ingredients per recipe
    SELECT 
        COUNT(*) AS TotalIngredients,
        AVG(IngredientCount) AS AvgIngredientsPerRecipe
    FROM (
        SELECT COUNT(*) AS IngredientCount
        FROM Ingredients
        WHERE RecipeID IN (
            SELECT RecipeID
            FROM MealPlanRecipes
            WHERE MealPlanID = nextMealPlanID
        )
        GROUP BY RecipeID
    ) AS IngredientCounts;

    -- Condition to check if the meal plan exceeds a limit (e.g., 5 meal plans per day)
    SELECT COUNT(MealPlanID) INTO mealplan_count
    FROM MealPlan NATURAL JOIN NutritionLog
    WHERE UserID = p_UserID AND DATE(Time) = CURRENT_DATE() AND Public = 1;

    IF mealplan_count > 5 THEN
        ROLLBACK;
    ELSE
        COMMIT;
    END IF;

END //

DELIMITER ;


## Trigger:
DELIMITER //

CREATE TRIGGER MealPlanPrivacyDefault
BEFORE INSERT ON MealPlan
FOR EACH ROW
BEGIN
    IF NEW.Name IS NULL OR TRIM(NEW.Name) = '' THEN
        SET NEW.Name = 'Untitled Meal Plan';
        SET NEW.Public = 0;
    END IF;
END //

DELIMITER ;
