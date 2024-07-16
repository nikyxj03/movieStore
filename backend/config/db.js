import mongoose from "mongoose";

const connectData = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to database');
    } catch (error) {
        console.error(`${error.message}`);
    }
}

export default connectData;