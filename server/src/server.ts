import express from "express";
import cors from "cors";
import userRoutes from "./routes/users";
import auditRoutes from "./routes/audits";
import db from "./config/database.config";

db.sync().then(() => {
  console.log("connect to db");
});

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/audits", auditRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
