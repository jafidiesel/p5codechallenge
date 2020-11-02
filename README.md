# p5codechallenge
Based on [plataforma5 code challenge](link)

Index:
1. How to setup this project
2. Pending items
3. Busines
4. Stack
5. back-end .env config
6. front-end .env config
7. Postman collection (updated)
8. Endpoints available in back-end

## How to setup this project

- install postgresql 12+
- setup db with /data/db_structure.sql
- backend: 
    
        npm install
        npm start

- front-end:

        npm install
        npm start

Note: make sure to have .env files correctly added (instructions bellow)

### Pending items:
    backed:
    - endpoints structure validation with Joi.js
    - apply eslint
    - 3 package limitation by passenger

    front-end
    - better frontend debugging
    - implement the following endpoints
        - get passenger by id
        - delete passenger
    - apply eslint 
    - 3 package limitation by passenger
    - 5-digit flight number validation 

## Busines

An airport offers its passengers a luggage storage service until boarding time. You need a webapp to be managed by a manager. The system is simple, they will store different types of packages:

Large (a carry-on or similar)
Small (a purse, backpack or small bag)
Garments (coats or blankets)
When entering their items, the passenger must prove their name and flight number (5-digit alphanumeric code) and a unique ID will be assigned to each garment they want to leave (maximum 3).

The administrator may:

- See a list of passengers who have deposited the packages.
- See what packages a passenger deposited and what type they are.
- Add packages for one passenger (without exceeding the maximum).
- Remove all packages from a passenger (all at once)


## Stack:

### Back-end

- expressjs
- pg-promise (postgresql js library)
- postgresql
- controller, service, repository layers
- dotenv (.env managment)

### Front-end

- React (create-react-app)
- react-router
- react-bootstrap
- axios

### back-end .env config:

    db_username='postgres'
    db_password='postgres'
    db_host='localhost'
    db_port=5432
    db_database='p5codechallenge'
    PORT=5000

    replace db_* with your own db configs

### front-end .env config:

    REACT_APP_API_V1=http://localhost:5000

### Postman collection (updated)

located at:

    /postman/p5-challenge.postman_collection.json
    

### Endpoints available in back-end

- New package: POST /package
- New passenger: POST /passenger
- List all packages created: GET /package
- List all passenger created: GET /passenger
- Get a passenger created: GET /passenger/:passengerId
- Delete a passenger: DELETE /passenger/:passengerId
- Checkout all packages from a passenger: DELETE /:passengerId/package
