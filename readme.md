# Money converter






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





