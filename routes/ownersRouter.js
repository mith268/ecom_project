const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownermodel");



if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        let owners = await ownerModel.find();

        if (owners.length > 0) {
            return res.status(503).send("You don't have permission to create a new owner");
        }

        let { fullname, email, password } = req.body;

        let createdowner = await ownerModel.create({
            fullname,
            email,
            password,
        });

        console.log(createdowner);
        return res.status(200).send("You can create a user");
    });
}

module.exports = router;
 