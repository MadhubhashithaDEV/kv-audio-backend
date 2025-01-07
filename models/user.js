import mongoose from "mongoose";

//create json arry for save the user details  data to mongo db

const userSchema = new mongoose.Schema({

    email : {
        type : String,
        required : true,
        unique: true
    },

    password : {
        type : String,
        required : true
    },

    role :{
        type : String,
        required : true,
        default : "coustomer"
    },
    
    firstName :{
        type : String,
        required : true
    },

    lastName :{
        type : String,
        required : true
    },

    address :{
        type : String,
        required : true
    },
    
    phone : {
        type : String,
        required : true
    },

    profilePicture : {
        type : String,
        required : true,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.pnghttps://www.kindpng.com/imgv/iwoxbb_user-profile-default-image-png-clipart-png-download/"

    }

});

const User = mongoose.model("User",userSchema);
export default User;