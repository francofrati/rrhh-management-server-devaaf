import dotenv from "dotenv";
dotenv.config();

import server from "./src/server";

//For env File

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
