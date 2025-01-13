import mongoose from "mongoose";

//create json arry for save the product details data to mongo db

const productSchema = new mongoose.Schema({

    key :{
        type : String,
        required : true,
        unique : true
    },
    name :{
        type : String,
        required : true
    },

    price :{
        type : Number,
        required : true
    },

    category :{
        type : String,
        required : true,
        default : "uncategorized"
    },

    description :{
        type : String,
        required : true
    },

    dimentions :{
        type : String,
        required : true
    },

    avilability :{
        type : Boolean,
        required : true,
        default : true
    },

    image:{
        type :[String],
        required : true,
        default : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }



})

const Product = mongoose.model("Product",productSchema);
export default Product;