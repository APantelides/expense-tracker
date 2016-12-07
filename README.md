# expense-tracker
Description: A simple expense tracking application.

## Table of Contents
- [Usage](#Usage)
- [Databse](#Database)
- [Stack](#Stack)
- [RoadMap](#RoadMap)
- [Routes](#Routes)

## Usage

1. npm install
2. Install Postgres on your computer
  2.1 Set up role for server
    - Enter Postgres terminal and run the following commands:
      - `CREATE USER ubuntu WITH PASSWORD 'password';`
      - `ALTER USER ubuntu WITH SUPERUSER;`
  2.1 Create database with appropriate user and role
    - Enter Postgres terminal and run the following commands:
      - `CREATE DATABASE expensetracker;`
  2.2 Create key.js file in `server/resources/config` using properly filled out `keys.example.js` from above info
3. run npm deploy
4. navigate to localhost:3000

Optional: To persist database data on restart you will have to comment line 11 in `server/database/db-config.js` and restart the server

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

## Stack
  - Backend: Postgres + Node&Express with sequelize(ORM)
  - Auth: Oauth 2.0 Local or bcrypt + jwt + passport (local strategy)
  - Front-End/UI: React + React-Router Material-UI & SASS for styling
  - Unit Testing: Mocha + Chai (+ Sinon if needed)
  
## RoadMap
  - Finish writing tests for full coverage of current implementation 
  - Deploy on AWS EC2(simple) or use Docker & Haproxy to create a scalable environment hosted on AWS ECS (preferred)
  - Support Euros, Yuan, Yen, CAD, Pesos, Ruble, AUD and be able to convert to and from using real time exchange rates (upadting every hour).
  - Users can change the report to aggregate spending per hour, day,month, and year (in addition to per week)

## Routes

- get '/api/dashboard'
- get '/api/expenses/:userId'
- get '/api/expense/:id'
- post '/api/expense'
- put '/api/expense'
- delete '/api/expense/:id'
- get '/api/report'
- get '/api/isUserAdmin/:userId' (not used)
- get '/api/adminRead'