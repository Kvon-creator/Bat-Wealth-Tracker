const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

const PORT = 3000;

app.use(express.json());

app.use(function (req, res, next) {
    console.log(req.method + " " + req.url);
    next();
});

app.use(express.static("public"));

app.get("/api/assets", async function (req, res) {
    try {
        const assets = await prisma.asset.findMany({
            orderBy: {
                id: "asc"
            }
        });

        res.json(assets);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to get assets"
        });
    }
});

app.post("/api/assets", async function (req, res) {
    try {
        const name = req.body.name;
        const type = req.body.type;
        const value = Number(req.body.value);

        if (!name || !type || isNaN(value)) {
            return res.status(400).json({
                message: "Invalid asset data"
            });
        }

        const asset = await prisma.asset.create({
            data: {
                name: name,
                type: type,
                value: value
            }
        });

        res.status(201).json(asset);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to save asset"
        });
    }
});

app.put("/api/assets/:id", async function (req, res) {
    try {
        const id = Number(req.params.id);
        const name = req.body.name;
        const type = req.body.type;
        const value = Number(req.body.value);

        const asset = await prisma.asset.update({
            where: {
                id: id
            },
            data: {
                name: name,
                type: type,
                value: value
            }
        });

        res.json(asset);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to update asset"
        });
    }
});

app.delete("/api/assets/:id", async function (req, res) {
    try {
        const id = Number(req.params.id);

        await prisma.asset.delete({
            where: {
                id: id
            }
        });

        res.json({
            message: "Asset deleted"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete asset"
        });
    }
});

app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});