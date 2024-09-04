// Express as our HTTP server
import Express from "express";
import bodyParser from "body-parser";
import cors from "cors";

//import routes
import imageRouter from "./api/imageRouter.js";

// Make an express application
const app = new Express();
app.use(cors());
app.use(bodyParser.json({ limit: "1.2mb" }));

// Log all requests: logging route
// - All methods, all paths, no response (fall through)
app.use((req, res, next) => {
  console.log(`${req.method} request at ${req.path}`);
  next();
});

// Attach the game routes
app.use("/api/", imageRouter);

// Static file server
app.use(Express.static("public"));

// Start server listening on port 8000
app.listen(8000, () => {
  console.log("Listening on port 8000");
});
