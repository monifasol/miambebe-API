# miam-bebe-server

API for Miam Bebe. 

Access the API here: 

Find the frontend ReactJS app here: 

## Description

Miam bebe is a Baby's nutrition tracker. Allows parents to keep track of what they give to their babies on a weekly basis, keeping track of their intolerances, introduction of foods, reaction to them, dates,...

Parents introduced the initial food goals for the following week, and during the week they'll submit the foods they are giving to their babies. They'll see the progress of their babies nutrition for that week, and plan accordingly the remaining meals. 

Parents will receive a notification at the middle of the week, with the current status of the week, the nutrition progress, and some recip ideas for the remaining meals.

They can access the full agenda where all the weeks and their information are stored. 

They can also store receipts for future insipiration and share those with other parents. 

Parents will receive tips of nutrition randomly.



## API Routes:

| Route                            | Description                                            | Persmissions   |
| -------------------------------- | ------------------------------------------------------ | -------------- |
| GET "/"                          | Renders the homepage/main dashboard                    |                |

| **/auth**                        |                                                        |                |
| POST "/login"                    | Logs user in, and redirects to the dashboard           |                |
| POST "/signup"                   | Creates a new user. Logs in and redirects to dashboard |                |
| GET "/logout"                    | Logs user out, and redirects to landing page           |                |

| **/users**                       |                                                        |                |
| GET "/users"                     | Lists all users                                        |                |
| GET "/users/:id"                 | Gets user with id :id                                  |                |
| GET "/users/:id/babies"          | Lists babies of a user with id :id                     |                |
| GET "/users/recipes"             | Lists all recipes of a user with id :id                |                |

| **/babies**                      |                                                        |                |
| GET "/babies"                    | Lists all babies                                       |                |   
| GET "/babies/:id"                | Gets baby with id :id                                  |                |
| PUT "/babies/:id"                | Saves data from baby's edit form (baby info)           |                |

| **/weeks**                       |                                                        |                |
| GET "/weeks/:babyId"             | Lists all weeks for baby with id :babyId (AGENDA)      |                |
| GET "/weeks/:id"                 | Gets week with id :id form "add given food"            |                |
| PUT "/weeks/:id/goals"           | Updates Week (used to add GOALS to the week)           |                |
| DELETE "/weeks/:id/goals"        | Deletes goals from the week                            |                |

| **/goals**                       |                                                        |                |
| GET "/goals/:weekId"             | Lists goals of a week with id :weekId                  |                |
| GET "/goals/:userId"             | Gets agenda of user with id :id                        |                |
| GET "/goals/:id"                 | Gets agenda with id :id                                |                |
| GET "/goals/:id/weeks"           | Lists all weeks in the agenda with id :id              |                |

| **/foodgroups**                  |                                                        |                |
| GET "/foodgroups"                | Lists all foodgroups                                   |                |

| **/intolerances**                |                                                        |                |
| GET "/intolerances"              | Lists all intolerances                                 |                |

| **/recipes**                     |                                                        |                |
| GET "/recipes"                   | Lists all recipes                                      |                |
| GET "/recipes/:id"               | Gets a recipe with id :id                              |                |
| POST "/recipes/new"              | Creates a new recipe (saves data from form)            |                |
| PUT "/recipes/:id"               | Updates a recipe (saves data from edit form)           |                |
| DELETE "/recipes/:id"            | Deletes a recipe                                       |                |

| **/tips**                        |                                                        |                |
| GET "/tips/random"               | Gets a random tip                                      |                |

| **/notifications**               |                                                        |                |
| GET "/notifications/:weekId"     | Gets notifications for week with id :weekId            |                |



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