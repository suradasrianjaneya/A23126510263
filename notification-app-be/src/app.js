import express from "express";
import cors from "cors";

import vehicleRoutes from "./routes/vehicles.routes.js";
import depotRoutes from "./routes/depots.routes.js";
import notificationRoutes from "./routes/notifications.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use(logger);

app.use("/vehicles", vehicleRoutes);
app.use("/depots", depotRoutes);
app.use("/notifications", notificationRoutes);


export default app;