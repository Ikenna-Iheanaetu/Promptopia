import mongoose from "mongoose";

let isConnected = false

export const connectDb = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log('MongoDB is connected');
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URI)
        isConnected = true
        console.log('MongoDB is connected')
    } catch (error) {
        console.log(error)
    }
}