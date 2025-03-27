import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "Name must contain at least 3 characters"],
        maxLength: [30, "Wrong Name"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide Valid Email"]
    },
    phone: {
        required: true,
        type: Number
    },
    address: {
        type: String,
        required: false,
    },
    firstNiche: {
        type : String,
        required : false,
    },
    secondNiche: {
        type : String,
        required : false,
    },
    thirdNiche: {
        type : String,
        required : false,
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "At least 8 characters"],
        maxLength: [32, "Password too large"],
        select: false,
    },
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job" // Reference to the Job model
        }
    ],
    roadmaps : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Roadmap" // Reference to the Roadmap model
        }
    ],
    appliedJobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordOTP: {
        type: String,
        select: false
    },
    resetPasswordOTPExpiry: {
        type: Date,
        select: false
    }
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    if (!enteredPassword) {
        throw new Error("Password is required");
    }
    
    if (!this.password) {
        throw new Error("User password not found");
    }

    try {
        const isMatch = await bcrypt.compare(enteredPassword, this.password);
        return isMatch;
    } catch (error) {
        throw new Error("Failed to verify password");
    }
};

userSchema.methods.getJWTToken = function () {
    return jwt.sign(
        { 
            _id: this._id.toString(),
            version: 1 // Add a version to help with token validation
        },
        process.env.JWT_SECRET_KEY,
        { 
            expiresIn: process.env.JWT_EXPIRE || '7d',
            algorithm: 'HS256' // Explicitly specify the algorithm
        }
    );
};

export const User = mongoose.models.User || mongoose.model("User", userSchema);
