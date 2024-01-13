const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//GENERATE TOKEN
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
};

//REGISTER USER
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

    //CREATE NEW USER
    const user = await User.create({
        name: name,
        email: email,
        password: password
    });

    
    //GENERATE JSON TOKEN
    const token = generateToken(user._id);

    //SENDING HTTP COOKIE
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true
    });

    if (user) {
        const {_id, name, email, photo, phone, bio} = user;
        res.status(201).json({
            _id: _id,
            name: name,
            email: email,
            photo: photo,
            phone: phone,
            bio: bio,
            token
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

//LOGIN USER
const loginUser = asyncHandler( async (req, res) => {
    const {email,  password} = req.body;

    //VALIDATION
    if (!email || !password) {
        res.status(400);
        throw new Error("Please add email and password");
    }

    //CHECK IF ACCOUNT EXISTS
    const user = await User.findOne({email});
    if (!user) {
        res.status(400);
        throw new Error("User not found, please create an account");
    }

    //PASSWORD CHECKER
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    //GENERATE TOKEN
    const token = generateToken(user._id);

    //SENDING HTTP COOKIE
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true
    });

    if (user && passwordIsCorrect) {
        const {_id, name, email, photo, phone, bio} = user;
        res.status(200).json({
            _id: _id,
            name: name,
            email: email,
            photo: photo,
            phone: phone,
            bio: bio,
            token
        });
    } else {
        res.status(400);
        throw new Error("Invalid email or password");
    }

});

module.exports = {
    registerUser,
    loginUser
}