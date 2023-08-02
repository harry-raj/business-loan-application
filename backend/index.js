const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const router = require('./src/routes/index');
// const connectToDatabase = require('./src/db/db.config');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

const start = async () => {
    try {
        // await connectToDatabase();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.error('PANIC: Exit with error', error);
        process.exit(1);
    }
};

start();
