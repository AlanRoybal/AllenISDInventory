const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const registerUser = asyncHandler( async (req, res) => {
    const {name, email, password} = req.body;

    //VALIDATION
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all required fields");
    }

    if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be at least 6 characters");
    }

    //CHECK EXISTING USER
    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400);
        throw new Error("Email has already been registered");
    }

    //ENCRYPTING PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //CREATE NEW USER
    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    });

    if (user) {
        const {_id, name, email, photo, phone, bio} = user;
        res.status(201).json({
            _id: _id,
            name: name,
            email: email,
            photo: photo,
            phone: phone,
            bio: bio
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

module.exports = {
    registerUser,

}