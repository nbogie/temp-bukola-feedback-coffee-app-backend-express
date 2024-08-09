import cors from "cors";
import express from "express";
import morgan from "morgan";
import {
    findCustomerById,
    findHighestCustomerId,
    setCustomerStampsAndFreeCoffees,
    tryToRedeemOneFreeCoffee,
} from "./customerService.js";

const app = express();

//allow morgan logger to get access to each request before and after our handlers
app.use(morgan("dev"));
//auto-include CORS headers to allow consumption of our content by in-browser js loaded from elsewhere
app.use(cors());
//parse body text of requests having content-type application/json, attaching result to `req.body`
app.use(express.json());

//used to initially test if the set up works
app.get("/", (req, res) => {
    res.send("Hello World!");
});
/**
 * @typedef {{id: string, name: string, stamps: number, freeCoffee: number}} CustomerData
 */

/**
 * @type {CustomerData[]}
 */
let customerData = [
    {
        id: "1",
        name: "Bukola",
        stamps: 5,
        freeCoffee: 0,
    },

    {
        id: "2",
        name: "Lindsay",
        stamps: 2,
        freeCoffee: 3,
    },

    {
        id: "3",
        name: "Neill",
        stamps: 0,
        freeCoffee: 1,
    },
    {
        id: "4",
        name: "Babatope",
        stamps: 0,
        freeCoffee: 0,
    },
];

//get all the customer data
app.get("/customerdata", (req, res) => {
    res.json(customerData);
});

//generate an id to use for the next added customer
const generateId = () => {
    const maxId =
        customerData.length > 0 ? findHighestCustomerId(customerData) : 0;
    return String(maxId + 1);
};

//create a customer
app.post("/customerdata", (req, res) => {
    const body = req.body;
    if (!body.name) {
        res.status(400).json({ error: "content missing" });
        return;
    }

    /**
     * @type CustomerData
     */
    const oneCustomerData = {
        id: generateId(),
        name: body.name,
        stamps: 0,
        freeCoffee: 0,
    };

    customerData.push(oneCustomerData);
    res.json(oneCustomerData);
});

// update customer data to add a stamp and free coffee (if it meets the conditions)
app.patch("/customerdata/customer/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const customer = findCustomerById(customerData, id);
    if (!customer) {
        res.status(404).json({ error: "no such customer" });
        return;
    }
    setCustomerStampsAndFreeCoffees(customer, body.stamps);
    res.json(customer);
});

// list stamp and free coffee of a specific customer (this does not work)
app.get("/customerdata/cutomer/:id/stampsandfreecoffee", (req, res) => {
    const id = req.params.id;
    const customer = findCustomerById(customerData, id);
    if (!customer) {
        res.status(404).json({ error: "no such customer" });
        return;
    }
    res.json(customer);
});

//Redeem free coffee

app.post("/customerdata/customer/:id/redeem", (req, res) => {
    const id = req.params.id;
    const customer = findCustomerById(customerData, id);

    const success = tryToRedeemOneFreeCoffee(customer);

    if (success) {
        res.json({
            message: `You have redeemed free coffee. You have ${customer.freeCoffee} left to redeem`,
        });
    } else {
        res.json({ message: `You have no coffee to redeem` });
    }
});

//use the environment variable PORT, or 4000 as a fallback
const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
    console.log(
        `Your express app started listening on ${PORT}, at ${new Date()}`
    );
});
