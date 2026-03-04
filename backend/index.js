import express from "express";
import Chat from "./Chat.js";

const port = 5131;
const app = express();
app.use(express.json());

// Create a sse driven chat
new Chat(app);

// Start the server
app.listen(port, () => console.log('Backend running on port ' + port));