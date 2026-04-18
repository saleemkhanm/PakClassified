const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const TypeData = require('../Models/AdvertismentTypeModel');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Type Database Connected Successfully');
    } catch (error) {
        console.error('Error Type Database Not Connected', error);
    }
};

const data = [
    { name: 'Vezel' },
    { name: 'corolla' },
    { name: 'civic' }
];

const initDB = async () => {
    try {
        await TypeData.deleteMany({});
        await TypeData.insertMany(data);
        console.log('Data was Initialized');

    } catch (error) {
        console.error('Data initialization failed', error);
    }
};

(async () => {
    await connectDB();
    await initDB();
})();
