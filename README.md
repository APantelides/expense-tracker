# expense-tracker
Description: To be filled out..

Install / Run instrcutions: To be filled up...

Plan v0.0.1:
  Stack:
    - Backend: Postgres + Node&Express with sequelize(ORM)
    - Auth: Oauth 2.0 Local or crypto + jwt
    - Front-End/UI: React + React-Router and maybe Redux (if needed) with React Bootstrap & SASS for styling
    - Unit Testing: Mocha + Chai (+ Sinon if needed)
    
  If time allows:
    - Deploy on AWS EC2(simple) or use Docker & Haproxy to create a scalable environment hosted on AWS ECS (preferred)
    - Support Euros, Yuan, Yen, CAD, Pesos, Ruble, AUD and be able to convert to and from using real time exchange rates (upadting every hour).
    - Users can change the report to aggregate spending per hour, day,month, and year (in addition to per week)
    
  DB:
    - Tables: Users, Expenses, Reports (if we want to save all generated reports to eliminate duplicate queries)
    - Relationships: Users to Expenses (One to Many)
    
    User Columns:
      - ID(primary key): Integer Auto Increment
      - Username: String (15 chars)
      - Email: String (256 chars)
      - Password: String (12 chars)
      - IsAdmin: Boolean
    
    Expense Columns:
      - ID(primary key): Integer Auto Increment
      - Owner ID(User ID foreign key): Integer
      - Currency: String Default USD
      - Price: Decimal (dollars) or Int (cents)
      - Description: String(256 chars)
