const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51ISMpaDeuELIrjv1MS6gAec1vHjLcFJ7T4DOfL8qCferHF9XlHRK4HeG5PpSQqtKOWL7HNH9kA5wtVzZg5aDmu0m00bgeus42J");
const app = express();
const { v4: uuidv4 } = require('uuid');
app.use(cors());
app.use(express.json());



app.post("/checkout", async(req, res) => {
    let error;
    let status;
    try {
        const { product, token } = req.body;
        
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });
        const key = uuidv4();
        const charge = await stripe.charges.create(
            {
                amount: product.price * 100,
                currency: "usd",
                customer: customer.id,
                receipt_email: token.email,
                description: 'all product',
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip
                    }
                }

            },
            {idempotencyKey: key });
            console.log("Charge:", { charge });
            status = "success";
    } catch (error) {
        console.log(error)
        status = "error";
    }
    res.json({status})

});
const port = process.env.PORT || 8000;

if (process.env.NODE_ENV === "production") {
    app.use(express.static('build'));
    const path = require('path');
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
};
app.listen(port, () => {
    console.log("server is running");
});
