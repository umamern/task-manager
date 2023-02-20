const taskModel=require("../models/Task")


const getTasks=async (req,res)=>{
    let data=await taskModel.find().lean()
    res.render("home",{data})
}

const createTask=async (req,res)=>{
    let payload={
        task:await req.body.task
    }
    await taskModel.create(payload)
    res.redirect("/tasks")
}

const getTask=async (req,res)=>{
    let id=await req.params.id
    let data=await taskModel.findOne({_id:id}).lean()
    res.render("edit",{data})
}

const updateTask=async(req,res)=>{
    let payload={
        task:await req.body.task
    }
    console.log(payload);
    await taskModel.updateOne({_id:req.params.id},{$set:payload})
    res.redirect("/tasks")
}

const deleteTask=async (req,res)=>{
    await taskModel.deleteOne({_id:req.params.id})
    res.redirect("/tasks")
}


module.exports={
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}