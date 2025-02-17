# Title: BalanceBites

## Project Summary
Our project, BalanceBites, is a home for calorie counters who also want to track their nutrients with a little guidance. Our app is designed to make tracking calories and macronutrients (fats, carbohydrates, protein) easy while giving the user recommendations based on their deficiencies in said categories. If a user were lower in fats than proteins, we would recommend them to eat an item with a higher fat content, while if they had almost all their macronutrients, we would then focus on getting their calories up to their chosen level. Our app aims to gather nutritional information from common household foods and recipes, and give the user the choice of what to pick based on the recommended daily values of macronutrients. In this way, our app saves the user time in choosing the most balanced meal or food for their current calorie and macronutrient intake, helping them track their calories and macronutrients while also balancing their diet without the need for lengthy research. 

### Description
Calorie counting and macronutrient tracking are both hard and complicated tasks that many people undertake to obtain a healthier lifestyle. We want to help those people by making their decisions easier and giving them a stress-free place to do it. Unfortunately, to get good diet information and recommendations, it can either be very costly in time or money, depending on if you go down the research rabbit-hole or pay a dietitian or nutritionist, both of which are very limited resources in today’s world. We want to help those people that are stuck on their dieting journey and need some help in balancing their diet while maintaining their chosen calorie level without wasting said time or money.

Our aim is to give users a data-driven approach to solving this issue. We collect data on common foods and recipes for them, allow them to add their own or maintain a liked/favorited list of their most-eaten foods, and then show them the results of our findings based on what they need throughout their day. Essentially, the app tracks their calories and macronutrients, and gives them personalized recommendations about what food to eat given their deficiencies and the real-world data at hand. Subsequently, rather than searching for hours or paying a lot of money for the same or similar information, we can give them personal recommendations that are based solely on the nutritional data of common foods, such as those in most households, giving solid accessibility on top of convenience and speed.
  
### Good Creative Component
We plan to improve the functionality of our application by enhancing user engagement with our application and incorporating interactive visualization features. The creative components we plan to implement to achieve this include allowing users to share the macros of the food they ate with other users, letting users view the macros they consumed on a certain day, and giving users the ability to create and save their own custom recipes. These creative components will increase user engagement by giving users a way to interact with the application beyond just using its macro searching capabilities, and enhance its visualization aspect.

In further detail, the first creative component we plan to implement is a feature where users can choose to share the food and corresponding macros they’ve had with another user. Users can press a button that will allow them to select an existing user, based on the user’s id, and choose whether to share their information with them. This would allow the other user to see what foods that user has chosen (from the app) and what macros they have. We plan to utilize APIs that would allow users to communicate with our database, which stores their saved information and that of other users to achieve this. Users will also be able to visualize the shared data in bar graphs or just as a table.

Users will also be able to see bar graphs of the calories and macronutrient information of the foods they ate last week and the current week. This data is pulled from our database, and will need to be updated on a weekly (and daily) basis. Users can click on specific bars in a bar graph, where each graph represents a day, to see how much they differed from the recommended (standard) daily values in terms of their caloric and macronutrient intake. These bar graphs will only show values for the major macronutrients and calories.

We also plan to create a feature that will allow users to view our data containing macronutrient information of various foods and create their own custom recipes that can be saved to our database. The saved recipe will only be viewable by the user that created it, unless the user chooses to make it publicly available, which will enable all users to see the recipe and the user who made it. Users will utilize a menu to create a recipe that will allow them to select from a list of foods that will be searchable. Also, the foods will be categorized into specific types, and users will be able to apply filters on the menu to allow easier searching of specific foods/ingredients. This will require the use of various APIs to enable accessing and saving to our database and transforming the data.


## Usefulness

People nowadays face the issue of an unbalanced diet due to various common life constraints, which could lead to major health problems if unattended. Consuming too many calories can lead to obesity, diabetes, heart disease, and so on. On the other hand, taking in too few calories can result in weakness and fatigue. Our app helps people maintain a balanced calorie intake will benefit the well-being of our users.

Here are the basic functions of our app:
- The users can register an account in our app and set their daily calorie intake goals. They can also record the calories consumed each day for up to a week to examine their performance and share it with others.
- We will provide a reference data set on the nutritional facts for different foods for the users to choose. Users can input their desired food with the nutrition information if the food is missing in our database. 
- Recipes, which are based on a combination of different kinds of foods will also be provided and can be updated by the user as well. Different recipes will be recommended based on the goal set by the user. For example, foods that are rich in carbohydrates will likely be recommended to people who want high-calorie intake.
- Visualization of the last week's calories and macros will be provided. The user will be able to click on total calorie performance (measured in how far they were from their goal). Then, they can click each day and the app would give them custom information for that day such as their specific macros.

There are simple features like registering and setting up calorie goals and complex features such as recommending different recipes that meet the user’s calorie needs and visualizing the total calorie intake and other macros.

**Comparison with Similar Applications:**

MyNetDiary is a similar website that contains recipes, food nutritional facts and keeps track of users’ nutrition goals and health information with great visualization. It is a very successful product but we are different in the following ways:
- Instead of making the user walk aimlessly through loads of diets and text, we will give them data-driven recommendations and suggestions tailored to their nutritional needs.
- Some features in MyNetDiary require subscriptions. We implement this website with a focus on helping people in need and creating a community where users help each other instead of profiting.
- Users choose their calories and we help them get their daily nutrition while fulfilling their caloric needs, rather than calculating their calorie intake for them. We give suggestions and recommendations, but don’t give the impression of judging the user based on their diet.


## Realness (Data Sources)
We will rely on real-world datasets with recipes and common foods to power our application:
* **Data:** Food Nutritional Facts and Recipes (Many Datasets)
  - **Source:** [Food Nutrition Dataset](https://www.kaggle.com/datasets/utsavdey1410/food-nutrition-dataset/data)
  Provided by Utsav Dey, who is a third-year computer science undergrad from India interested in Machine Learning and Data Analytics.
  - **Content:** It describes the nutritional facts for different kinds of food, such as calories, fat, carbohydrates, sugar, and protein.
  - **Format:** CSV
  - **Data Size:** 2395 kinds of food (cardinality) each with 37 kinds of nutrition (degree).
* **Data:** Nutritional Values for Common Foods and Products
    - **Source:** [Nutrition Values Dataset](https://www.kaggle.com/datasets/trolukovich/nutritional-values-for-common-foods-and-products)
    - **Content:** This dataset describes the nutritional facts for many common foods, giving information on calories, serving size, proteins, carbohydrates, and fats.
    - **Format:** CSV
    - **Data Size:** 8789 different foods (cardinality), each with 77 kinds of nutrition (degree).
  
## Functionality Description
### Basic Functions (CRUD & Search)
Users can create accounts, log in, update profiles, and delete accounts. The main feature of the website will be adding foods using the "add" button so that if a food is not found in the database, a user can add this food with their calories and nutrition. If the food is in the database already, the user can search for the food and view the macronutrients and calories of the food item. Additionally, users can update foods in case their nutrition or calorie information is wrong and can add recipes that use common foods and combines nutrition and calories. They may also look for publicly available recipes provided by other users by using our search feature. The user can also apply filters on their search in order to narrow down what they are looking for in a recipe. They may also save foods to a “liked list” for easy access in the future, save calories, fats, proteins, and carbohydrates for the current day for food search, and save nutrition and calorie data for one week at a time for comparison. 
### Advanced Function (Complex Feature)
Users can view their weekly calories in an interactive graph which also shows a breakdown of their macronutrients when the user hovers over a day of the week. These macronutrients include the three major macronutrients (protein, fat, and carbohydrates). In this interactive graph, they can also view how close they are to their calorie goals for each day. Users can also share the macronutrients of a specific food item of their choosing with other users. 

## Low-Fidelity UI Mockup
![Screenshot 2025-02-17 003310](https://github.com/user-attachments/assets/27422ec8-286c-4dc8-ab81-113c2644258e)

## Project Work Distribution
- **Jake Van Anrooy (Primary Backend Developer):**
  - **Responsibilities:**
    - Develop and manage the backend server.
    - Implement data crawling from the two datasets.
    - Design and maintain the database schema and CSV data integration.
    - Help develop the queries needed for searching.
    - Primarily responsible for communication between frontend and backend on creative components.
- **Daniel Buck (Secondary Backend Developer)**
  - **Responsibilities:**
    - Help develop and manage the backend server.
    - Help out with frontend when necessary. 
    - Help with implementing data crawling from both datasets. 
    - Develop queries needed for searching.
- **Jason Liao (Primary Full Stack Developer):**
  - **Responsibilities:**
    - Primary worker on the frontend, but will also help out with the backend to make sure it works with the frontend. 
    - Will keep the backend and frontend working and communicating correctly.
    - Will be working on creating the visualization front end for the creative components, and making sure the backend works correctly with the menus and other features.
    - Will be working on implementing the required APIs needed for the features.
- **Chi Zhang (Secondary Full Stack Developer):**
  - **Responsibilities:**
    - Secondary worker on the frontend, will help with the backend when necessary.
    - Implement the remote API that connect the users and the log-in page.
    - Help with communication between the backend and frontend.
