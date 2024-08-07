# Description

This is a simple express.js API for managing a customer loyalty system where customers earn stamps and can redeem free coffees based on the number of stamps they have accumulated

This project was done to complete a cosing challenge during my software engineering training with Academy.

## What can the APIs do

1. Get a list of all customers
2. Add one customer details
3. Update customer data with stamps and free coffee subject to conditions if met (if the stamp divided by 6 gives a remainder of zero the the free coffee increments by 1) otherwise it defaults to zero.
4. Redeem coffee (where a customer redeeems a free coffee their free coffee is decremented by 1 and and when the free coffee is zero a message is sent thet there is no free cofee left to be redeemed)

-   I was also tasked with listing all stamps and free cofee for a customer but I ran out of time trying to code that up

## Technologies

-   **Node.js**: JavaScript runtime for building server-side applications.
-   **Express.js**: Web framework for Node.js.
-   **Postman**: For testing endpoints (the test collection has been added to the repo)
-   **Swagger**: For documenting API https://app.swaggerhub.com/apis/OMOKEHINDEOLUWABUKOL/coffee-app-project-swagger-endpoints/1.0.0

## Set-Up Instruction

-   Clone this js express starter from Academy https://github.com/WeAreAcademy/academy-express-minimal-starter-js/
-   Run yarn
-   The server will start on http://localhost:4000 by default when you run yarn dev
-   You can now work with my code
