import mongoose from "mongoose";

const users_schema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    fname:{
        type: String,
        required: true,
    },
    lname:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    phone_number:{
        type: Number,
        required: true,
    },
    date_of_birth:{
        type: Date,
        required: true
    },
    profile_picture:{
        type: String,
        required: true,
    },
    documents:{
        type:Array,
        required:false
    },
    account_balance:{
        type:Number,
        required:true
    },
    account_rating:{
        type:Number,
        required:true
    },
    is_validated:{
        type:Boolean,
        required: true,
        default: false
    },
    access_level:{
        type:Boolean,
        required: true,
        default: false
    }
})

const user_model = mongoose.model('users', users_schema)

export default user_model