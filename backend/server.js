import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

//routes
app.get("/", (req, res) => {
	res.send("home route");
});

app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log(`server is listening on ${PORT}`));
