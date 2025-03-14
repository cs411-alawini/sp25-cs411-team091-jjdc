# Revisions

- Removed Recipes attribute from MealPlan entity in UML diagram; addresses comment on UML diagram.
- Removed Ingredients column from Recipes table in logical design/relational schema; addresses comment on relational schema.
- Changed the relationship from UserInfo to MealPlan (on the MealPlan side) in the UML diagram to 0..10 instead of 1..10 because of accidental typing (a user is allowed to have 0 meal plans).
- Updated the Entity and Relationship assumptions to be in line with the UML diagram; addressed comment on UML diagram.
