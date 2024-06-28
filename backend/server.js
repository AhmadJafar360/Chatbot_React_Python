// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import router from "./routes/route.js";
// import db from "./models/index.js";

// dotenv.config();

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN || "*",
//   })
// );
// app.use(cookieParser());
// app.use(express.json());
// app.use("/v1/api", router);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// const PORT = process.env.PORT || 4000;

// db.sequelize
//   .sync({ force: false }) // force: false to not drop tables
//   .then(() => {
//     console.log("Database & tables created!");
//     app.listen(PORT, () => {
//       console.log(`Server Running, click to access port${PORT}`);
//     });
//   });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/route.js";
import db from "./models/index.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(router);

const { PORT = 4000 } = process.env;

app.listen(PORT, () => console.log("Server Running, click to access port", PORT));
