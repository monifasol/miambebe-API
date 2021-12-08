# miambebe-server

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



## API Routes:
  
| HTTP Verb | URL                     | Request body | Response body | Action                                                | 
| --------- | ----------------------- | ------------ | ------------- | ----------------------------------------------------- | 
| GET       | "/"                     | (empty)      | JSON          | Renders the homepage/main dashboard                   |                
|               **/auth**                                                                                                    |
| POST      | "/login"                | JSON         | JSON          | Logs user in (data from form), redirects to dashboard | 
| POST      | "/signup"               | JSON         | JSON          | Creates a new user. Logs in and redirects to dashboard|                
| GET       |  "/logout"              | (empty)      | JSON          | Logs user out, and redirects to landing page          |                
|               **/users**                                                                                                   |
| GET       | "/users"                | (empty)      | JSON          | Lists all users                                       |                
| GET       | "/users/:id"            | (empty)      | JSON          | Gets user with id :id                                 |                
| GET       | "/users/:id/babies"     | (empty)      | JSON          | Lists babies of a user with id :id                    |                
| GET       | "/users/recipes"        | (empty)      | JSON          | Lists all recipes of a user with id :id               |
|               **/babies**                                                                                                  |
| GET       | "/babies"               | (empty)      | JSON          | Lists all babies                                      |                   
| GET       | "/babies/:id"           | (empty)      | JSON          | Gets baby with id :id                                 |               
| PUT       | "/babies/:id"           | JSON         | (empty)       | Saves data from baby's edit form (baby info)          |               
|               **/weeks**                                                                                                   |
| GET       | "/weeks/:babyId"        | (empty)      | JSON          | Lists all weeks for baby with id :babyId (AGENDA)     |                
| GET       | "/weeks/:id"            | (empty)      | JSON          | Gets week with id :id form "add given food"           |                
| PUT       | "/weeks/:id/goals"      | JSON         | JSON          | Updates Week (used to add GOALS to the week)          |                
| DELETE    | "/weeks/:id/goals"      | (empty)      | JSON          | Deletes goals from the week                           |                
|               **/goals**                                                                                                   |
| GET       | "/goals/:weekId"        | (empty)      | JSON          | Lists goals of a week with id :weekId                 |                
| GET       | "/goals/:userId"        | (empty)      | JSON          | Gets agenda of user with id :id                       |               
| GET       | "/goals/:id"            | (empty)      | JSON          | Gets agenda with id :id                               |                
| GET       | "/goals/:id/weeks"      | (empty)      | JSON          | Lists all weeks in the agenda with id :id             |                
|               **/foodgroups**                                                                                              |
| GET       | "/foodgroups"           | (empty)      | JSON          | Lists all foodgroups                                  |                
|               **/intolerances**                                                                                            |
| GET       | "/intolerances"         | (empty)      | JSON          | Lists all intolerances                                |                
|               **/recipes**                                                                                                 |
| GET       | "/recipes"              | (empty)      | JSON          | Lists all recipes                                     |                
| GET       | "/recipes/:id"          | (empty)      | JSON          | Gets a recipe with id :id                             |                
| POST      | "/recipes/new"          | JSON         | JSON          | Creates a new recipe (saves data from form)           |                
| PUT       | "/recipes/:id"          | JSON         | JSON          | Updates a recipe (saves data from edit form)          |                
| DELETE    | "/recipes/:id"          | (empty)      | (empty)       | Deletes a recipe                                      |                
|               **/tips**                                                                                                    |
| GET       | "/tips/random"          | (empty)      | JSON          | Gets a random tip                                     |                
|               **/notifications**                                                                                           |
| GET       |"/notifications/:weekId" | (empty)      | JSON          | Gets notifications for week with id :weekId           |             


## Models
User model

```
firstname: String
email: String, unique: true
password: String
```

Baby
Agenda
Week
Wish
Recipe
Foodgroup
Intolerance
Notification
Tip



## Links

### Git

The url to repository and to deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)


## Backlog:

Internalization
School connecting to app
Doctor connecting to app 
Share recipes to facebook
Add more graphics (food intolerances)
Manage introduction of foods