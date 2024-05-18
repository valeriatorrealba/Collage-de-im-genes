const express = require("express");
const app = express();
const expressFileUpload = require("express-fileupload");
const fs = require("fs").promises;

app.listen(3000, console.log("Server ON!"));

app.use(express.static("public"));
app.use(expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo que intentas subir supera el limite permitido.",
}));

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/public/formulario.html");
});

app.get("/collage", (req, res) =>{
    res.sendFile(__dirname + "/public/collage.html");
});

app.post("/imagen", (req, res) => {
    try {
        const { target_file } = req.files;
        const { posicion } = req.body

        target_file.mv(`${__dirname}/public/imgs/imagen-${posicion}.jpg`, (err) => {
            if(err) {
                return res.status(500).send(err);
            }
            res.redirect("/collage");
        });
        
    } catch (error) {
        res.status(500).send("Algo salio mal 🤷‍♀️ al cargar el archivo");
    }
});

app.get("/deleteImg/:imgName", async (req, res) =>{
    try {
        const { imgName } = req.params;

        await fs.unlink(`./public/imgs/${imgName}`);

        res.sendFile(__dirname + "/public/collage.html")
    } catch (error) {
        res.status(500).send(error)
    }
});

