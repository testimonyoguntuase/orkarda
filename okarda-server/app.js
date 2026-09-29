import express from "express";
import router from "./routes/routes.js";

const app = express();

app.use(express.json());

app.use(router);

app.listen(5000, () => console.log(`Server running on http://localhost:${5000}`));
