import {Schema, model} from "mongoose";
import {User} from "../../Entities/User";

const userSchema = new Schema<User>({
    _id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
});

export default model<User>("User", userSchema);