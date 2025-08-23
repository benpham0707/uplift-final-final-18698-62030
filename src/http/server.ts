import 'dotenv/config';
import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();

// Avoid importing browser-only modules on the server
// Ensure no client-only code is imported here
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use("/api/v1", routes);

const port = process.env.PORT || 8787;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on :${port}`);
});


