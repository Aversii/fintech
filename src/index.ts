import app from "./app";
app.get("/", function (req, res) {
    res.send("WELCOME TO API");
  });