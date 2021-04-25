const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Welcome Page</title></head>");
    res.write(
      '<body><h1>Welcome to my page!</h1><p>Enter username below:</p><form action="/create-user" method="POST"><input type="text" name="message"><button type="submit">Submit</button>'
    );
    res.write(
      '</form><form action="/user" method="POST"><button type="submit">To users page</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/user") {
    const list = "tabletop101, jeffrey200, dummyuser101";
    res.write("<html>");
    res.write("<head><title>Users Page</title></head>");
    if (fs.existsSync("message.txt")) {
      const data = fs.readFileSync("message.txt", "utf8");
      res.write("<body><p>Users: <br>" + data + "</p>");
    } else {
      res.write("<body><p>Users: <br>" + list + "</p>");
    }
    res.write(
      '<form action="/" method="POST"><button type="submit">To home page</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      if (fs.existsSync("message.txt")) {
        const data = fs.readFileSync("message.txt", "utf8");
        const input = data + ", " + message;
        fs.writeFileSync("message.txt", input);
        console.log(input);
      } else {
        fs.writeFileSync("message.txt", message);
        console.log(message);
      }

      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
};

module.exports = requestHandler;
