CREATE DATABASE p5codechallenge;

\c p5codechallenge;

CREATE TABLE passenger (
    passengerId serial PRIMARY KEY,
    username VARCHAR (50) NOT NULL,
    flightID VARCHAR (50) NOT NULL
);

CREATE TABLE package (
    packageId serial PRIMARY KEY,
    packageCode VARCHAR (10) NOT NULL,
    passengerId INT NOT NULL,
    category INT NOT NULL,
    FOREIGN KEY (passengerId)
        REFERENCES passenger (passengerId)
);