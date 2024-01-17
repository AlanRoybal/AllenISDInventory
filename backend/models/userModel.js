const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@allenisd.org$/,
            "Please enter a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be at least 6 characters"],
        //maxLength: [23, "Password must be less than 24 characters"],
    },
    photo: {
        type: String,
        required: [true, "Please add a photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png"
    },
    phone: {
        type: String,
        default: "+1"
    },
    bio: {
        type: String,
        maxLength: [249, "Bio must be less than 250 characters"],
        default: "bio"
    }
}, {
    timestamps: true
});

//ENCRYPTING PASSWORD
userSchema.pre("save", async function(next) {

    if (!this.isModified("password")) {
        return next();
    }

    //PASSWORD HASHING
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});

const User = mongoose.model("User", userSchema);
module.exports = User;