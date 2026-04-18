
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const CityArea = require('../Models/CityAreaModel');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('CityArea Database Connected Successfully');
    } catch (error) {
        console.error('Error: CityArea Database Not Connected', error);
    }
};

// Make sure these IDs exist in your City collection
const data = [
    { name: 'model town', cityid: '68f618cd433073152ae45778' },
    { name: 'johar town', cityid: '64f618d8433073152ae4577a' },
    { name: 'hakim town', cityid: '64f618cd433073152ae45778' },
    { name: 'green town', cityid: '64f618d8433073152ae4577a' },
    { name: 'akbar town', cityid: '64f618cd433073152ae45778' },
    { name: 'azma chowk', cityid: '64f618d8433073152ae4577a' }
];

const initDB = async () => {
    try {
        await CityArea.deleteMany({});
        await CityArea.insertMany(data);
        console.log('Data was Initialized');
    } catch (error) {
        console.error('Data initialization failed', error);
    }
};

(async () => {
    await connectDB();
    await initDB();
})();
