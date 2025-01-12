import Review from "../models/review.js";

export function addReview(req,res){
    if(req.user == null){
        res.status(401).json({
            message : "Please login and try again",
        });
        return
    }

//add coustomer review

    const data = req.body;

    data.name = req.user.firstName + " " + req.user.lastName;
    data.profilePicture = req.user.profilePicture;
    data.email = req.user.email;



    const newReview = new Review(data)
    newReview.save().then(()=>{
        res.json({message: "Review add successfully"});
    }).catch(()=>{
        res.status(500).json({error:"Review addition failed"});
    });
}

//get coustomer reviews

export async function getReviews(req,res){
   
    const user = req.user;
    try{
        const reviews = await Review.find();
        res.json(reviews);

    }catch(e){
        res.status(500).json({error:"Review retrieval failed"});
    }



    
    }   



//delete coustomer reviews


export function deleteReview(req,res){
    const email = req.params.email;

//admin can delete any coustomer review
    if(req.user == null){
        res.status(401).json({
            message : "Please login and try again",
        });
        return
    }

    if(req.user.role == "admin"){
      
    Review.deleteOne({email:email}).then(()=>{
        res.json({message:"Review deleted successfully"});
    }).catch(()=>{
        res.status(500).json({error:"Review deletion failed"});
    });

    return
    
}

//coustomer can delete their own review

if(req.user.role == "coustomer"){
    
    if(req.user.email == email){
        Review.deleteOne({email:email}).then(()=>{
            res.json({message:"Review deleted successfully"});
        }).catch(()=>{
            res.status(500).json({error:"Review deletion failed"});
        });

    }else{
        res.status(401).json({
            message : "You are not authorized to delete this review",
        });
    }
}



}

//admin can approve or disapprove the review

export function approveReview(req,res){
    const email = req.params.email;
    if(req.user == null){
        res.status(401).json({
            message : "Please login and try again",
        });
        return
    }
    if(req.user.role == "admin"){
        Review.updateOne({
            email:email,
        },{
            isApproverd:true
        }).then(()=>{
            res.json({message:"Review approved successfully"});
        }).catch(()=>{
            res.status(500).json({error:"Review approval failed"});
        });
    }else{
        res.status(401).json({
            message : "You are not authorized to approve this review, only admin can approve the review",
        });
    }
        
    
}