import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import router from "./routes/test.js";
import mongoose from "mongoose";
import expeditionsRoutes from "./routes/expeditionsRoutes.js";
import leadersRoutes from "./routes/leadersRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import commentsRoutes from "./routes/commentsRoutes.js";
import cloudinaryConfig from "./config/cloudinary.js";
import passport from "passport";
import passportConfig from "./config/passport.js";

const app = express();

const port = process.env.PORT || 5000;

const addMiddleWares = () => {
  app.use(express.json());

  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  const corsOptions = {
    origin: "https://remoteislandexpeditions-server.vercel.app",
    // origin: "http://localhost:3000",
    credentials: true,
  };
  app.use(cors());

  cloudinaryConfig();

  app.use(passport.initialize());
  passportConfig(passport);
};

const startServer = () => {
  app.listen(port, () => {
    console.log("Server is running in port " + port);
  });
};

const loadRoutes = () => {
  app.use("/api", router);
  app.use("/api/expeditions", expeditionsRoutes);
  app.use("/api/leaders", leadersRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api/comments", commentsRoutes);
};

const mongoDBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("MongoDB is running in port", port);
  } catch (error) {
    console.log("error connecting to MongoDB", error);
  }
};

(async function controller() {
  await mongoDBConnection();
  addMiddleWares();
  loadRoutes();
  startServer();
})();
