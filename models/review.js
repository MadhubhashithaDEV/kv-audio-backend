import mongoose from "mongoose";

//create json arry for save the Revivew details data to mongo db

const reviewSchema = new mongoose.Schema({

    email :{
        type :  String,
        required : true,
        unique : true
    },

    name :{
        type : String,
        required : true
    },

    rating :{
        type : Number,
        required : true
    },

    Comment:{
        type : String,
        required : true
    },

    date:{
        type : Date,
        required : true,
        default : Date.now()
    },

    isApproverd :{
        type : Boolean,
        required : true,
        default : false
    },

    profilePicture : {
        type : String,
        required : true,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.pnghttps://www.kindpng.com/imgv/iwoxbb_user-profile-default-image-png-clipart-png-download/"

    }

})

const Review = mongoose.model("Review",reviewSchema);
export  default Review;