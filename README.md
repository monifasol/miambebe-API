# Miam Bebe Server (Back-end) application

Server application (API) for Miam Bebe. 

Access the [API](https://miambebe-server.herokuapp.com/) here. 

Find the [website](https://miambebe.herokuapp.com/) (client side, frontend app) here.

## Description

Miam bebe is a Baby's nutrition goals tracker. It allows parents to set some nutrition goals based on the main foodgroups, 
and keep track of their progress. Parents introduce some initial food goals for their babies. As they update the progress of their goals, they'll see a visual representation of what they have accomplished so far. 

Parents will receive a notification at the middle of the month, with the current status of their goals, the nutrition progress, and some recipes ideas for the remaining meals. They will also receive random nutrition tips.

On the other side, parents can store receipts for future insipiration and share those with other parents. 

In the futue, Miam Bebé will also offer a tracking system of their babies nutrition on a weekly basis, keep track of their intolerances, introduction of foods, reaction to them, dates,...


# Run locally

## Download, and install

Go to project directory `/miam-bebe-server` and run `npm install` to install all node packages and dependencies.   

In order to populate the database with mock data, there are some seeds prepare under `/db`. Go to that directory and run 
`node db/seeds.js`   

Come back to root directory `/miam-bebe-server` and run `npm start`.  

In the browser, API is running under `localhost:5000`  
You should get the message "All good in here".  

In order to start using, you need to download also the client side, and LOG IN on the website (admin@miambebe.com - 1234) in order to
generate a JWT token. Otherwise, the API will not work for you since the requests need to be authenticated and authorized.   


# API Documentation

## ✨API Routes✨

##### Auth routes

| HTTP verb | URL               | Request Headers                 | Request Body              | Action               |
| --------- | ----------------- | ------------------------------- | ------------------------- | -------------------- |
| POST      | `/auth/signup`    | --                              | { email, password, name } | Signs user up        |
| POST      | `/auth/login`     | --                              | { email, password }       | Logs user in         |
| GET       | `/auth/verify`    | Authorization: Bearer \< JWT \> | --                        | Verifies user token  |
| GET       | `/logout`         |                                 | --                        | Logs user out        |

##### Users routes
                                   
| HTTP verb | URL                 | Request body  | Response          | Action                                  |
| --------- | ------------------- | ------------- | ----------------- | --------------------------------------- |
| GET       |`/users`             | (empty)       | JSON              | Lists all users                         |                
| POST      |`/users`             | JSON          | JSON New user     | Adds a new user                         |                
| GET       |`/users/:id`         | (empty)       | JSON              | Returns the specified user              |  
| PUT       |`/users/:id`         | JSON          | JSON Updated user | Updates the specified user              |  
| PUT       |`/users/:id/baby`    | (JSON)        | JSON Updated user | Updates the specified user (adds baby)  |
| DELETE    |`/users/:id`         | (empty)       | (empty)           | Deletes the specified user              |  

##### Babies routes

| HTTP verb | URL                       | Request body  | Response           | Action                                   |
| --------- | ------------------------- | ------------- | ------------------ | ---------------------------------------- |
| GET       |`/babies`                  | (empty)       | JSON               | Lists all babies                         |                   
| POST      |`/babies/:userId`          | JSON          | JSON New Baby      | Adds a new baby for specified user       |                   
| GET       |`/babies/:id`              | (empty)       | JSON               | Returns the specified baby               |               
| GET       |`/babies/:id/goals`        | (empty)       | JSON               | Returns the goals for the specified baby |               
| PUT       |`/babies/:id`              | JSON          | JSON Updated baby  | Updates info for the speficied baby      | 
| POST      |`/babies/:babyId/uploadPic`| JSON (file)   | pic_url            | Adds avatar picture to baby              |
| PUT       |`/babies/goals/:goalId`    | JSON          | JSON Updated Goal  | Adds a new baby for specified user       |                   

##### Goals routes

| HTTP verb | URL              | Request body  | Response          | Action                                        |
| --------- | ---------------- | ------------- | ----------------- | --------------------------------------------- |
| POST      |`/goals`          | JSON          | JSON              | Adds a new goal (and pushes a goal to Baby)   |                
| GET       |`/goals/:id`      | (empty)       | JSON              | Returns the specified goal                    |  
| PUT       |`/goals/:id`      | JSON          | JSON Updated goal | Updates the specified goal                    |  
| DELETE    |`/goals/:id`      | (empty)       | (empty)           | Deletes the specified goal                    |  

##### Recipes routes

| HTTP verb | URL               | Request body  | Response         | Action                                  |
| --------- | ----------------- | ------------- | ---------------- | --------------------------------------- |
| GET       |`/recipes`         | (empty)       | JSON             | Lists all recipes                       |                
| POST      |`/recipes`         | JSON          | JSON New recipe  | Adds a new recipe                       |                
| GET       |`/recipes/:id`     | (empty)       | JSON             | Returns the specified                   |                
| PUT       |`/recipes/:id`     | JSON          | JSON             | Updates the specified recipe            |                
| DELETE    |`/recipes/:id`     | (empty)       | (empty)          | Deletes the specified recipe            |       
| GET       |`/recipes/:userId` | (empty)       | JSON             | Lists all recipes of the specified user |


##### Other routes: foodgroups, intolerances, tips, and notifications. 
        
| HTTP verb | URL                    | Request body  | Response  | Action                                       |
| --------- | ---------------------- | ------------- | ----------| -------------------------------------------- |
| GET       |`/foodgroups`           | (empty)       | JSON      | Lists all foodgroups                         |                
| GET       |`/intolerances`         | (empty)       | JSON      | Lists all intolerances                       | 
| GET       |`/tips/random`          | (empty)       | JSON      | Gets a random tip                            |                
| GET       |`/notifications/:babyId`| (empty)       | JSON      | Returns notifications for the specified baby |             


## Models

##### User model

```js
    firstname: { type: String, required: true },
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    babies: [{ type: Schema.Types.ObjectId, ref: "Baby" }]
```

##### Baby model

```js
    name: { type: String, required: true}, 
    age: { type: Number, required: true},        // in months
    weight: { type: Number, required: true},     // in Kg
    intolerances: [String],
    avoids: [String],
    name: { type: String},
    goals: [{ type: Schema.Types.ObjectId, ref: "Goal" }]
```

##### Goal model
```js
    foodgroup: { type: String, required: true},
    quantity: { type: Number, required: true},    // in portions
    given: { type: Number},
    baby: { type: Schema.Types.ObjectId, ref: "Baby" }
```

##### Recipe model
```js
    title: { type: String, required: true},
    content: { type: String, required: true},
    content: { type: String },
    preparationTime: { type: Number, required: true},   // in minutes 
    difficulty: { type: String, required: true, enum: ["easy", "medium", "hard"]},
    intolerances: [{ type: Schema.Types.ObjectId, ref: "Intolerance" }],
    tags: [{ type: Schema.Types.ObjectId, ref: "Foodgroup" }],
    user: { type: Schema.Types.ObjectId, ref: "User" }
```

##### Foodgroup model
```js
    name: { type: String, required: true},
    code: { type: String, required: true},
    description: { type: String, required: true},
    picture: { type: String }
```

##### Intolerance model
```js
    name: { type: String, required: true},
    foodgroups: [String]
```

##### Notification model
```js
    content: { type: String, required: true},
    baby: { type: Schema.Types.ObjectId, ref: "Baby" }
```

##### Tip model
```js
    content: { type: String, required: true}
```


## Links

### Git

URLs to repository and to deployed project

[Repository Link](https://github.com/monifasol/miambebe-server)

[Deploy Link](https://miambebe-server.herokuapp.com/)

### Slides

URL to the presentation slides

[Slides Link](https://docs.google.com/presentation/d/1xGhHNJUZrf0kUgqQx-IkHMziJCrfma6-KJy7SLHfJUs/edit#slide=id.p)


## Backlog

Internalization  
Share recipes to facebook  
Add more graphics (food intolerances)  
Manage introduction of foods  
School connecting to app  
Doctor connecting to app   
