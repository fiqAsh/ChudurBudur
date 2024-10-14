import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());

//routes
app.get("/", (req, res) => {
	res.send("home route");
});

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
	connectToMongoDB();
	console.log(`server is listening on ${PORT}`);
});
