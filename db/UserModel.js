import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  surname: { type: String },
  occupationDistrict: { type: String },
  village: { type: String },
  fin: { type: String },
  district: { type: String },
  objectType: { type: String },
  occupationName: { type: String },
  address: { type: String },
  education: { type: String },
  specialStatus: { type: String },
  phoneNumber: { type: String },
  phoneNumber2: { type: String },
  phoneNumber3: { type: String },
  jobStructure: { type: String },
  jobPosition: { type: String },
  currentPosition: { type: String },
  generalInfo: { type: String },
  cordinates: {type: Object},
  geouri: { type: String },
  fatherName:{type:String},
  relation:{type:String},
  birthDate:{type:String}
},{collection:"users",timestamps:true});
UserSchema.index({name:1})
export const UserModel = mongoose.model("UserModel",UserSchema)