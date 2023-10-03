import { UserModel } from "../db/UserModel.js";

export const Home_PageController = async(req,res)=>{
    const users = await UserModel.find().lean();
    res.render("index",{users});
    // res.json({users})
};


export const Admin_PageController =(req,res)=>{
    // res.json({"admin":"admin"});
    res.render("admin");
}