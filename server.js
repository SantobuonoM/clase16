import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { Container } from "../clase16-app/container.js";
import { optionsMariaDB } from "../clase16-app/options/config.js";
import { optionsSQLite3 } from "../clase16-app/options/config.js";
import { error } from "console";
import { knexCli } from "./createTableMessages.js";

const PORT = 8080;
const app = express();
const httpserver = new createServer(app);
const io = new Server(httpserver);

let products = new Container(optionsMariaDB.db, "products");
let messages = new Container(optionsSQLite3.db, "messages");

app.use(express.static("views"));

app.engine("handlebars", engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

app.get("/", async (req, res) => {
  res.render("form");
});

io.on("connection", async (socket) => {
  console.log("Conexión establecida");
  const dbProducts = await products.listarAll();
  const dbMessages = await messages.listarAll();
  
  io.sockets.emit("products", dbProducts);
  io.sockets.emit("messages", dbMessages);

  socket.on("newProduct", async (product) => {
    console.log(product);
    await products.insertar(product);
    const dbProducts = await products.listarAll();
    io.sockets.emit("products", dbProducts);
  });
  socket.on("newMessage", async (message) => {
    console.log(message);
    await messages.insertar(message);
    const dbMessages = await messages.listarAll();
    io.sockets.emit("messages", dbMessages);
  });
});

const server = httpserver.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
server.on("error", () => console.log(`Error: ${error}`));
