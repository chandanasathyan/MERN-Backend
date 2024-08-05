const mongoose = require('mongoose');

async function connectDb() {
    try {
        await mongoose.connect(process.env.DB_URL);
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDb;