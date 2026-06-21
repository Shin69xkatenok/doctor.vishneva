const express = require("express");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const SHOP_ID = "ТВОЙ_SHOP_ID";
const SECRET_KEY = "ТВОЙ_SECRET_KEY";

app.post("/create-payment", async (req, res) => {

    try {

        const payment = await axios.post(
            "https://api.yookassa.ru/v3/payments",
            {
                amount: {
                    value: "12000.00",
                    currency: "RUB"
                },

                capture: true,

                confirmation: {
                    type: "redirect",
                    return_url: "http://localhost:3000"
                },

                description: "Консультация врача"
            },
            {
                auth: {
                    username: SHOP_ID,
                    password: SECRET_KEY
                },

                headers: {
                    "Idempotence-Key": uuidv4()
                }
            }
        );

        res.redirect(payment.data.confirmation.confirmation_url);

    } catch (error) {

        console.log(error.response?.data);
        res.send("Ошибка оплаты");

    }
});

app.listen(3000, () => {
    console.log("Server started");
});
function openEducationPhoto() {
    document.getElementById('educationModal').style.display = 'flex';
}

function closeEducationPhoto() {
    document.getElementById('educationModal').style.display = 'none';
}
