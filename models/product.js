import mongoose from "mongoose";

//create json arry for save the product details data to mongo db

const productSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },

    price :{
        type : Number,
        required : true
    },

    description :{
        type : String,
        required : true
    },

})

const Product = mongoose.model("Product",productSchema);
export default Product;