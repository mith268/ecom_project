const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/scatch")
.then(()=>{
    console.log('connected');
    
})
.catch((err)=>{
    console.log("CONNECTION ERROR : ",err)
})

module.exports=mongoose.connection