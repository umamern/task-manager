if(process.env.NODE_ENV!=="production"){
    require("dotenv").config()
}



const express=require("express")
const {engine}=require("express-handlebars")
const mongoose=require("mongoose")
const methodoverride=require("method-override")
const path=require("path")

const taskroute=require("./routes/taskRoutes")

let app=express()


mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_URI, (err)=>{
    if (err) throw err
    console.log("db connected");
})


app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))

app.engine("handlebars",engine())
app.set("view engine", "handlebars")

app.use(methodoverride("_method"))

app.use("/tasks",taskroute)


app.listen(process.env.PORT || 5000, (err)=>{
    if(err) throw err
    console.log("server is running on 5000");
})