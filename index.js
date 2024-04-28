const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const config = require('./config.js');
const { jsonInterceptor } = require('./utils/jsonInterceptor.js');

const authRouter = require('./routers/authRouter.js');
const realtyRouter = require('./routers/realtyRouter.js');

const corsOptions = {
    origin: config.FRONTEND_URL,
    credentials: true,
    optionSuccessStatus: 200,
    exposedHeaders: '*',
};

const app = express();

app.use(express.json());
app.use(express.static('static'));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(fileUpload({}));
app.use(jsonInterceptor);

app.use('/auth', authRouter);
app.use('/realty', realtyRouter);

const DB_URL =
  `mongodb+srv://vanya2535:${config.DB_PASSWORD}@cluster0.mcapsor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

async function start() {
    try {
        await mongoose.connect(DB_URL);

        app.listen(config.BACKEND_PORT, () => {
            console.log(`Server listen on http://localhost:${config.BACKEND_PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
