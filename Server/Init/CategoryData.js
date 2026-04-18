
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const AdvertisementCategory = require('../Models/AdvertismentlCategoryModel');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Category Database Connected Successfully');
    } catch (error) {
        console.error('Error Category Database Not Connected', error);
    }
};

const data = [
    { name: 'Vezel', img: 'vezel.jpg' },
    { name: 'corolla', img: 'corolla.jpg' },
    { name: 'alto', img: 'alto.jpg' },
    { name: 'jeep', img: 'jeep.jpg' },
    { name: 'civic', img: 'civic.png' },
    { name: 'fortuner', img: 'fortuner.png' }
];

const initDB = async () => {
    try {
        await AdvertisementCategory.deleteMany({});
        await AdvertisementCategory.insertMany(data);
        console.log('Data was Initialized');

    } catch (error) {
        console.error('Data initialization failed', error);
    }
};

(async () => {
    await connectDB();
    await initDB();
})();
