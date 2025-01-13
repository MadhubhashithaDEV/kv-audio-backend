import Product from "../models/product.js";
import { isItAdmin } from "./userController.js";

// add products

export function addProduct(req,res){

    if(req.user==null){
        res.status(401).json({
            message : "please login and try again"
        })
        return
    }if(req.user.role != "admin"){
        
        res.status(403).json({
            message:"you are not authorized to perform this action"
        })
        return 

    }

    const data = req.body;
    const newProduct= new Product(data);

    
    newProduct.save().then(()=>{
     
        res.json({message:"Product added successfully"});

    })
    .catch((error)=>{

        res.status(500).json({error: "product addition failed"});
    });
}

//get all products
//only admin can get avilable and unavilable products,
//coustomers can't get unavilabe products but customer can get avilable products 🛠️  

export async function getProducts(req,res){

    try{
        if(isItAdmin(req)){
            const products = await Product.find();
            res.json(products);
            return;
        }else{
            const products = await Product.find({avilability:true});
            res.json(products);
            return;
        }
        
    }catch{
        res.status(500).json({error:"failed to get products"});

    }
}

//update products

export async function updateProduct(req,res){
    try{
        if(isItAdmin(req)){

            const key =req.params.key;

            const data = req.body

            await Product.updateOne({key:key},data);  
            
            res.json({message:"product updated successfully"});

        }else{
            res.status(500).json({message : "you are not authorized to perform this action"});
        }



    }catch(e){
        res.status(500).json({error:"failed to update product"});
    }
}

//delete products

export async function deleteProduct(req,res){
    try{
        if(isItAdmin(req)){
            const key =req.params.key;
        
        await Product.deleteOne({key:key});

        res.json({message:"product deleted successfully"});

        }else{
            res.status(500).json({message : "you are not authorized to perform this action"});
            return;
        }

    }catch(e){
        res.status(500).json({error:"failed to delete product"});
    }
}


