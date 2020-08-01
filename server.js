const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

const history = [];

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/file", (req, res) => {
    let fileName = Math.random().toString("36");
    fileName = `upload/${fileName}`;
    let fileStream = fs.createWriteStream("public/" + fileName);

    req.pipe(fileStream);
    req.on("end", () => {
        res.end(fileName);
    });
});

app.get("/file", (req, res) => {
    fs.readdirSync("public/upload").forEach(file => {
        console.log(file);
    });

    res.end(JSON.stringify(fs.readdirSync("public/upload")
    ));
})

app.get("/message", (req, res) => {
    res.send(JSON.stringify(history));
});

app.get("/message/:messageId", (req, res) => {
    res.send(JSON.stringify(history[req.params.messageId]));
});

app.put("/message/:messageId", (req, res) => {
    history[req.params.messageId] = req.body;
    res.send(JSON.stringify(history[req.params.messageId]));
});

app.delete("message/:messageId", (req, res) => {
    history[req.params.messageId] = null;
    res.send(JSON.stringify(history[req.params.messageId]));
})

app.post("/message", (req, res) => {
    history.push(req.body);
    console.log(req.body);
    res.status(201).send(req.body);
})

app.listen(8000, () => console.log('Listen on 8K port!'));