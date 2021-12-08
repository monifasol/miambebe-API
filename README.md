

# Miam Bebe Server application

Server application (API) for Miam Bebe. 

Access the API here: ...

Find the frontend app here: ...

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
| POST      | `/signup`    | --                              | { email, password, name } | Signs user up        |
| POST      | `/login`     | --                              | { email, password }       | Logs user in         |
| GET       | `/verify`    | Authorization: Bearer \< JWT \> | --                        | Verifies user token  |
| GET       | `/logout`    |                                 | --                        | Logs user out        |


##### Users routes
                                   
| HTTP verb | URL                 | Request body  | Response          | Action                                  |
| --------- | ------------------- | ------------- | ----------------- | --------------------------------------- |
| GET       |`/users`             | (empty)       | JSON              | Lists all users                         |                
| POST      |`/users`             | JSON          | JSON New user     | Adds a new user                         |                
| GET       |`/users/:id`         | (empty)       | JSON              | Returns the specified user              |  
| PUT       |`/users/:id`         | JSON          | JSON Updated user | Updates the specified user              |  
| DELETE    |`/users/:id`         | (empty)       | (empty)           | Deletes the specified user              |  
| GET       |`/users/:id/babies`  | (empty)       | JSON              | Lists babies of the specified user      |                
| GET       |`/users/recipes`     | (empty)       | JSON              | Lists all recipes of the specified user |

##### Babies routes

| HTTP verb | URL             | Request body  | Response           | Action                                      |
| --------- | --------------- | ------------- | ------------------ | ------------------------------------------- |
| GET       |`/babies`        | (empty)       | JSON               | Lists all babies                            |                   
| POST      |`/babies`        | JSON          | JSON New Baby      | Adds a new baby                             |                   
| GET       |`/babies/:id`    | (empty)       | JSON               | Returns the specified baby                  |               
| PUT       |`/babies/:id`    | JSON          | JSON Updated baby  | Updates info for the speficied baby         | 

##### Weeks routes

| HTTP verb | URL                | Request body  | Response          | Action                                   |
| --------- | ------------------ | ------------- | ----------------- | ---------------------------------------- |
| GET       |`/weeks/:babyId`    | (empty)       | JSON              | Lists all weeks for the specified baby   |   
| POST      |`/weeks/:babyId`    | JSON          | JSON New week     | Adds a new week for the specified baby   |   
| GET       |`/weeks/:id`        | (empty)       | JSON              | Returns the specified week               |                
| PUT       |`/weeks/:id/goals`  | JSON          | JSON Updated week | Updates Week (add GOALS to the week)     |                
| DELETE    |`/weeks/:id/goals`  | (empty)       | JSON              | Deletes goals from specified week        | 

##### Goals routes

| HTTP verb | URL              | Request body  | Response          | Action                               |
| --------- | ---------------- | ------------- | ----------------- | ------------------------------------ |
| GET       |`/goals/:weekId`  | (empty)       | JSON              | Lists goals for the specified week   |                
| GET       |`/goals/:id`      | (empty)       | JSON              | Returns the specified goal           |  
| PUT       |`/goals/:id`      | JSON          | JSON Updated goal | Updates the specified goal           |  
| DELETE    |`/goals/:id`      | (empty)       | (empty)           | Deletes the specified goal           |  

##### Recipes routes

| HTTP verb | URL            | Request body  | Response         | Action                          |
| --------- | -------------- | ------------- | ---------------- | ------------------------------- |
| GET       |`/recipes`      | (empty)       | JSON             | Lists all recipes               |                
| POST      |`/recipes`      | JSON          | JSON New recipe  | Adds a new recipe               |                
| GET       |`/recipes/:id`  | (empty)       | JSON             | Returns the specified           |                
| PUT       |`/recipes/:id`  | JSON          | JSON             | Updates the specified recipe    |                
| DELETE    |`/recipes/:id`  | (empty)       | (empty)          | Deletes the specified recipe    |       


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
    intolerances: [{ type: Schema.Types.ObjectId, ref: "Intolerance" }],
    avoids: [{ type: Schema.Types.ObjectId, ref: "Foodgroup" }]
```

##### Week model
```js
    startdate: { type: Date, required: true},
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
    public: Boolean,
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

The url to repository and to deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)


## Backlog

Internalization
Share recipes to facebook
Add more graphics (food intolerances)
Manage introduction of foods
School connecting to app
Doctor connecting to app 