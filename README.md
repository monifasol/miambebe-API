

# Miam Bebe Server (Back-end) application

Server application (API) for Miam Bebe. 

Access the API here: https://miambebe-server.herokuapp.com/

Find the frontend app here: https://miambebe.herokuapp.com/

## Description

Miam bebe is a Baby's nutrition tracker. It allows parents to keep track of what they give to their babies on a weekly basis, keeping track of their intolerances, introduction of foods, reaction to them, dates,...

Parents introduced the initial food goals for the following week, and during the week they'll submit the foods they are giving to their babies. They'll see the progress of their babies nutrition for that week, and plan accordingly the remaining meals. 

Parents will receive a notification at the middle of the week, with the current status of the week, the nutrition progress, and some recip ideas for the remaining meals.

They can access the full agenda where all the weeks and their information are stored. 

They can also store receipts for future insipiration and share those with other parents. 

Parents will receive tips of nutrition randomly.


# API Documentation

## ✨API Routes✨

##### Auth routes

| HTTP verb | URL          | Request Headers                 | Request Body              | Action               |
| --------- | ------------ | ------------------------------- | ------------------------- | -------------------- |
| POST      | `/auth/signup`    | --                              | { email, password, name } | Signs user up        |
| POST      | `/auth/login`     | --                              | { email, password }       | Logs user in         |
| GET       | `/auth/verify`    | Authorization: Bearer \< JWT \> | --                        | Verifies user token  |
| GET       | `/logout`    |                                 | --                        | Logs user out        |

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

| HTTP verb | URL             | Request body  | Response           | Action                                      |
| --------- | --------------- | ------------- | ------------------ | ------------------------------------------- |
| GET       |`/babies`        | (empty)       | JSON               | Lists all babies                            |                   
| POST      |`/babies/:userId`| JSON          | JSON New Baby      | Adds a new baby for specified user          |                   
| GET       |`/babies/:id`    | (empty)       | JSON               | Returns the specified baby                  |               
| PUT       |`/babies/:id`    | JSON          | JSON Updated baby  | Updates info for the speficied baby         | 
| POST      |`/babies/:babyId/uploadPic`| JSON (file)    | pic_url  | Adds avatar picture to baby                |

##### Weeks routes

| HTTP verb | URL                       | Request body  | Response          | Action                                   |
| --------- | ------------------------- | ------------- | ----------------- | ---------------------------------------- |
| GET       |`/weeks/:babyId`           | (empty)       | JSON              | Lists all weeks for the specified baby   |   
| POST      |`/weeks`                   | JSON          | JSON New week     | Adds a new week for the specified baby   |   
| GET       |`/weeks/:babyId/:firstday` | (empty)       | JSON              | Returns week with the specified firstday |   
| GET       |`/weeks/:id`               | (empty)       | JSON              | Returns the specified week               |                
| PUT       |`/weeks/:id`               | JSON          | JSON Updated week | Updates Week (add GOALS to the week)     |                
| DELETE    |`/weeks/:id`               | (empty)       | JSON              | Deletes goals from specified week        | 

##### Goals routes

| HTTP verb | URL              | Request body  | Response          | Action                                        |
| --------- | ---------------- | ------------- | ----------------- | --------------------------------------------- |
| POST      |`/goals`          | JSON          | JSON              | Adds a new goal (and pushes a goal to Week)   |                
| GET       |`/goals/:id`      | (empty)       | JSON              | Returns the specified goal                    |  
| PUT       |`/goals/:id`      | JSON          | JSON Updated goal | Updates the specified goal                    |  
| DELETE    |`/goals/:id`      | (empty)       | (empty)           | Deletes the specified goal                    |  
| GET       |`/goals/:weekId`  | (empty)       | JSON              | Lists goals for the specified week            |                

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
| GET       |`/notifications/:weekId`| (empty)       | JSON      | Returns notifications for the specified week |             


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
    name: { type: String}
```

##### Week model
```js
    firstday: { type: String, required: true},
    lastday: { type: String, required: true},
    baby: { type: Schema.Types.ObjectId, ref: "Baby" },
    goals: [{ type: Schema.Types.ObjectId, ref: "Goal" }]
```

##### Goal model
```js
    foodgroup: { type: String, required: true},
    quantity: { type: Number, required: true},    // in portions
    given: { type: Number},
    week: { type: Schema.Types.ObjectId, ref: "Week" }
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
    week: { type: Schema.Types.ObjectId, ref: "Week" }
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