var express = require("express");
var router = express.Router();

const Contenedor = require("./Contenedor");

const ARCHIVO_PRODUCTOS = "productos.txt";

const contenedorProductos = new Contenedor({ filename: ARCHIVO_PRODUCTOS });

const esAdministrador = true;

router.get("/:id?", async function (req, res) {
  if (req.params.id) {
    const productos = await contenedorProductos.getById(req.params.id);
    res.send(productos);
  } else {
    const productos = await contenedorProductos.getAll();
    res.send(productos);
  }
});

router.post("/", async function (req, res) {
  if (esAdministrador) {
    const resultado = await contenedorProductos.save(req.body);
    res.send(resultado);
  } else {
    res.send(
      JSON.stringify({ error: -1, descripcion: "método no autorizado" })
    );
  }
});

router.put("/:id", async function (req, res) {
  if (esAdministrador) {
    const producto = await contenedorProductos.getById(req.body.id);
    if (producto) {
      contenedorProductos.deleteById(producto.id);
    }
    const resultado = await contenedorProductos.save(req.body);
    res.send(resultado);
  } else {
    res.send(
      JSON.stringify({ error: -1, descripcion: "método no autorizado" })
    );
  }
});

router.delete("/:id", async function (req, res) {
  if (esAdministrador) {
    const resultado = await contenedorProductos.deleteById(req.params.id);
    res.send(resultado);
  } else {
    res.send(
      JSON.stringify({ error: -1, descripcion: "método no autorizado" })
    );
  }
});

module.exports = router;
