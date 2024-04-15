const EventEmitter = require("events");
const http = require("http");
const fs = require("fs");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("httpStatus", (statusCode) => {
  console.log(`HTTP Status Code: ${statusCode}`);
});

myEmitter.on("fileReadSuccess", (fileName) => {
  console.log(`File ${fileName} read successfully`);
});

myEmitter.on("fileReadError", (err) => {
  console.error(`Error reading file: ${err}`);
});

const server = http.createServer((req, res) => {
  const url = req.url;

  myEmitter.emit("routeAccess", url);

  let filePath = "";
  switch (url) {
    case "/about":
      console.log("About page requested");
      res.writeHead(200, { "Content-Type": "text/plain" });
      filePath = "./views/about.html";
      break;
    case "/contact":
      console.log("Contact page requested");
      res.writeHead(200, { "Content-Type": "text/plain" });
      filePath = "./views/contact.html";
      break;
    case "/products":
      console.log("Products page requested");
      res.writeHead(200, { "Content-Type": "text/plain" });
      filePath = "./views/products.html";
      break;
    case "/subscribe":
      console.log("Subscribe page requested");
      res.writeHead(200, { "Content-Type": "text/plain" });
      filePath = "./views/subscribe.html";
      break;
    default:
      console.log("Home page requested");
      res.writeHead(200, { "Content-Type": "text/plain" });
      filePath = "./views/home.html";
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found\n");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
