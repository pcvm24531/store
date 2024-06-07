import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        lastName: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        ci:{
            type: mongoose.Schema.Types.Number,
            required: true,
        },
        userName:{
            type: mongoose.Schema.Types.String,
            required: true,
        },
        password:{
            type: mongoose.Schema.Types.String,
            required: true,
        },
        phone:{
            type: mongoose.Schema.Types.Number,
            required: true,
        },
        address:{
            type: mongoose.Schema.Types.String,
            required: true,
        },
        email:{
            type: mongoose.Schema.Types.String,
            required: false,
        },
        position:{
            type: mongoose.Schema.Types.String,
            required: true,
        },
        dateOfContract:{
            type: mongoose.Schema.Types.Date,
            required: true,
        },
        workingHours:{
            type: mongoose.Schema.Types.String,
            required: true,
        },
        emergencyContactName:{
            type: mongoose.Schema.Types.String,
            required: false,
        },
        emergencyContactPhone:{
            type: mongoose.Schema.Types.String,
            required: false,
        },
        registrationDate:{
            type: mongoose.Schema.Types.Date,
            required: false,
        }
    }
);

export const User = mongoose.model("User", UserSchema);