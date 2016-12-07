# expense-tracker
Description: A simple expense tracking application.

## Table of Contents
- [Usage](#usage)
- [Testing](#testing)
- [Stack](#stack)
- [Databse](#database)
- [Routes](#routes)
- [RoadMap](#roadmap)

## Usage

1. npm install
2. Install Postgres on your computer
  -Set up role for server
    - Enter Postgres terminal and run the following commands:
      - `CREATE USER ubuntu WITH PASSWORD 'password';`
      - `ALTER USER ubuntu WITH SUPERUSER;`
  - Create database with appropriate user and role
    - Enter Postgres terminal and run the following commands:
      - `CREATE DATABASE expensetracker;`
3. Create key.js file in `server/resources/config` using properly filled out `keys.example.js` from above info
4. run npm deploy
5. navigate to localhost:3000

To make a user an admin enter the postgres terminal, select the appropriate database and run the following command: - `UPDATE users SET "isAdmin"=true WHERE _id= userid;`

Optional: To persist database data on restart you will have to comment line 11 in `server/database/db-config.js` and restart the server

## Testing
Execute: npm test
Note: Left testing for last as it is my weakest area. Got blocked and ran out of time. If I had more time I would have spend 15 more minutes troubleshooting and then emailed for help. I need to bush up on the implementation.

## Stack
  - Backend: Postgres + Node&Express with sequelize(ORM)
  - Auth: Oauth 2.0 Local or bcrypt + jwt + passport (local strategy)
  - Front-End/UI: React + React-Router Material-UI & SASS for styling
  - Unit Testing: Mocha + Chai (+ Sinon if needed)
  
## Database

DB:
    - Tables: Users, Expenses
    - Relationships: Users to Expenses (One to Many)
    
    Table Name: users
    Columns:
      - _id(primary key): Integer Auto Increment
      - userName: String
      - email: String
      - password: String
      - isAdmin: Boolean
    
    Table Name: expenses
    Columns:
      - id(primary key): Integer Auto Increment
      - userId(User ID foreign key): Integer
      - Currency: String Default USD
      - Price: Decimal (dollars)
      - Description: String
      - Date: Date

## Routes

### Backend Routes
  - `get` `'/api/dashboard'`
  - `get` `'/api/expenses/:userId'`
  - `get` `/api/expense/:id'`
  - `get` `'/api/report'`
  - `get` `'/api/isUserAdmin/:userId'` (deprecated)
  - `get` `'/api/adminRead'`
  - `post` `'/api/expense'`
  - `put` `'/api/expense'`
  - `delete` `'/api/expense/:id'`

### React Routes
  - `/`: Home Page (not logged in), Dashboard (logged in)
  - `/login`: Login Page
  - `/signup`: Signup Page
  - `/logout`: Home Page (deauthenticated)
  - `/report`: Expense Report Page
  - `/editExpense/:id` Edit Expense Form
  - `/adminDash` Administrator Dashboard
  - `/createExpense` Expense Form

## RoadMap
  - Finish writing tests for full coverage of current implementation 
  - Deploy on AWS EC2(simple) or use Docker & Haproxy to create a scalable environment hosted on AWS ECS (preferred)
  - Support Euros, Yuan, Yen, CAD, Pesos, Ruble, AUD and be able to convert to and from using real time exchange rates (upadting every hour).
  - Users can change the report to aggregate spending per hour, day,month, and year (in addition to per week)