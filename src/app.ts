import express, { Express } from "express";

// import the event routes from the new routes file
import itemRoutes from "./api/v1/routes/ItemRoutes";

const app: Express = express();

app.use(express.json());

// Route handler for events
app.use("/api/v1", itemRoutes);

// Export the app
export default app;