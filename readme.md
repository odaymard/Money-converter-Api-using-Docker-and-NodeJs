# Money converter

  RestfullAPI for converting money between different currencies.
  The central bank of europe provides daily data related to the exchange rates between EURO and 
  different currencies.
  our service gets the new data by scheduling a cron job for bringing the data everyday at 16:00,
  the provided data by the central bank contains only the exchange rate between EURO and the other currincies,
  our service extracts the other exchange rates by comparing them to EURO.




## Table of Contents

- [Requirements](#requirements)
- [Getting started](#getting-started)
  - [Configuring environment variables](#configuring-environment-variables)
  - [Installing dependencies](#installing-dependencies)
- [Running](#running)  
- [Tests](#testing)
- [Todo](#Todo)


## Requirements

- Docker

## Getting started


### Configuring environment variables
Create a `.env` file in the root directory and follow the example `.env.example`.


### Installing dependencies
  in the root directory. Clone the repo and run the `docker-compose up` in the root Directory.


## Running

The `docker-compose up` command will start up our server with the mongoDb. 
And by using tool like postman we can send requests to our server on our default port 3001

### Convert money endpoint


``
Method:GET http://localhost:3001/curConverter?sourceAmount=10&sourceCurrency=EURO&targetCurrency=USD
``

it will give the equal ammount of money in the USD.
## Testing 
  the test uses mocha and chai assertion library.
  
  to run the test:
```
 docker-compose -p tests run -p 3001 --rm app npm run test

```

## Todo
 I would like to use Redis to store the exchange rates instead of mongodb 





