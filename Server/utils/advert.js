require('dotenv').config();
const mongoose = require('mongoose');
const AdvertismentCategory = require('../Models/AdvertismentlCategoryModel');

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/PakClassified');
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("MongoDB connection error:", error);

    }
}

async function uploadData() {
    const data = [
        { name: "Vezel", img: "/Public/Cars Images/vezel.jpg" },
        { name: "Corolla", img: "/Public/Cars Images/corolla.jpg" },
        { name: "Civic ", img: "/Public/Cars Images/civic.png" },
        { name: "Alto", img: "/Public/Cars Images/alto.jpg" },
        { name: "Jeep", img: "/Public/Cars Images/jeep.jpg" },
        { name: "Fortuner", img: "/Public/Cars Images/fortuner.jpg" },
        { name: "Cover", img: "/Public/Cars Images/cover.jpg" },
    ];


    try {
        await AdvertismentCategory.deleteMany({})
        await AdvertismentCategory.insertMany(data);
        console.log("Data uploaded successfully!");
    } catch (error) {
        console.error("Error uploading data:", error);
    } finally {
        mongoose.connection.close();
    }
}

async function main() {
    await connectDB();
    await uploadData();
}

main();
