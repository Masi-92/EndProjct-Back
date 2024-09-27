import {model, Schema} from "mongoose";

const userSchema = new Schema({

    fullName: String,
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true, minlength: 6},
    email: {type: String, unique: true, required: true},
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    }
});

export default model("User", userSchema);
