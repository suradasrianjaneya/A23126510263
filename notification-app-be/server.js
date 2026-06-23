import { Log } from "./logging-middleware/logger.js";

app.listen(PORT, async () => {

   await Log(
      "backend",
      "info",
      "server",
      "Backend server started"
   );

   console.log(`Server running on ${PORT}`);
});