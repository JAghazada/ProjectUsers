import mongoose from "mongoose";
const DB_URI = process.env.DB_URI;
export const connect = () => {
    mongoose.set("strictQuery", true);
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then((response) => console.log("connected to database"))
        .catch((err) => console.log(err));
}
