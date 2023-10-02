import {UserModel} from "../db/UserModel.js";
export const  AddUserController = async(req,res)=>{
  try {
    const {user} = req.body;
    const new_user = new UserModel(user);
    await new_user.save();
    return res.status(201).json({success:true,message:"Əlavə edildi",new_user})

  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Serverdə xəta baş verdi"
    })
  }

}
export const SearchUserController = async (req, res) => {
  try {
    const { name, surname } = req.query;
    
    // Create a query object to build the search conditions dynamically
    const query = {};

    if (name) {
      query.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive search for name
    }

    if (surname) {
      query.surname = { $regex: new RegExp(surname, 'i') }; // Case-insensitive search for surname
    }

    // If both name and surname are empty, return all users
    if (!name && !surname) {
      const allUsers = await UserModel.find({});
      return res.status(200).json({
        success: true,
        message: "All users",
        data: allUsers,
      });
    }

    // Use the query object to search for users
    const searchResults = await UserModel.find(query);

    return res.status(200).json({
      success: true,
      message: "Search results",
      data: searchResults,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Serverdə xəta baş verdi",
    });
  }
};