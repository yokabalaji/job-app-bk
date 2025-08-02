import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import connectDB from "./src/config/dbConfig";
import userRouter from "./src/routes/user.router";
import jobRouter from "./src/routes/job.router";
import router from "./src/routes/auth.router";
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = 8080;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal",
      version: "0.1",
    },
    servers:[{
      url:"http://localhost:8080/",
    },

    ],
   
  },
  apis: ['./src/routes/job.router.ts'], };


const openapiSpecification = swaggerJsdoc(options);

connectDB();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(express.json());
app.use(cookieParser());
app.use(cors(), express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

app.use("/api/v1", jobRouter);

app.use('/api/v1', userRouter);

app.use('/api/v1', router);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});