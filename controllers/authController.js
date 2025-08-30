
const userModel=require("../models/usermodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {generateToken}=require("../utils/generateToken")


module.exports.registerUser= async (req,res)=>{
   try {
    let {fullname,email,password}=req.body
    let user =await userModel.findOne({email:email})
    if(user) return res.status(401).send("You already have an account, Please Login")
bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,async(err,hash)=>{
        if(err) return res.send(err.message)
        else {
        let createdUser=await userModel.create({fullname,email,password:hash})
        let token =generateToken(createdUser)
    res.cookie("token",token)
    res.send("user Created Successfully!")

}
    })
})
   } catch (error) {
    console.log(error.message);
    
   }
}




module.exports.loginUser = async (req, res) => {
  try {
    

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).send("Email or Password incorrect");

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(500).send("Something went wrong");
      if (!result) return res.status(400).send("Email or Password incorrect");

      let token =generateToken(user)
      res.cookie("token",token)
      res.render("shop")
    });

  } catch (error) {
    res.status(500).send(error.message);
  }
};












