var express = require("express");
var router = express.Router();

const Contenedor = require("./Contenedor");

const ARCHIVO_CARRITOS = "carritos.txt";
const ARCHIVO_PRODUCTOS = "productos.txt";

const contenedorProductos = new Contenedor({ filename: ARCHIVO_PRODUCTOS });
const contenedorCarritos = new Contenedor({ filename: ARCHIVO_CARRITOS });

router.get("/:id/productos", async function (req, res) {
  const carrito = await contenedorCarritos.getById(req.body.id);
  if (carrito) {
    res.send(carrito.productos);
  } else {
    res.send(
      JSON.stringify({ error: -1, descripcion: "carrito no encontrado" })
    );
  }
});

router.post("/", async function (req, res) {
  const nuevoCarrito = { productos: [] };
  const resultado = await contenedorCarritos.save(nuevoCarrito);
  res.send(resultado);
});

router.post("/:id/productos", async function (req, res) {
  const producto = await contenedorProductos.getById(req.body.id);
  if (producto) {
    const carrito = await contenedorCarritos.getById(req.body.id);
    if (carrito) {
      const newCarrito = {
        ...carrito,
        productos: [...carrito.productos, producto],
      };
      await contenedorCarritos.deleteById(carrito.id);
      await contenedorCarritos.save(newCarrito);
      res.send(carrito);
    } else {
      res.send(
        JSON.stringify({ error: -1, descripcion: "carrito no encontrado" })
      );
    }
  }
  res.send(
    JSON.stringify({ error: -1, descripcion: "producto no encontrado" })
  );
});

router.put("/:id", function (req, res) {
  res.send("carrito put");
});

router.delete("/:id", async function (req, res) {
  const carrito = await contenedorCarritos.getById(req.body.id);
  if (carrito) {
    carrito.productos = [];
    await contenedorCarritos.deleteById(carrito.id);
    res.send("Carrito eliminado");
  } else {
    res.send(
      JSON.stringify({ error: -1, descripcion: "carrito no encontrado" })
    );
  }
});

router.delete("/:id/productos/:id_prod", async function (req, res) {
  const carrito = await contenedorCarritos.getById(req.body.id);
  if (carrito) {
    const carritoActualizado = {
      ...carrito,
      productos: carrito.productos.filter(
        (carrito) => carrito.id !== req.body.id_prod
      ),
    };
    await contenedorCarritos.deleteById(carrito.id);
    await contenedorCarritos.save(carritoActualizado);
    res.send(carritoActualizado);
  } else {
    res.send(
      JSON.stringify({ error: -1, descripcion: "carrito no encontrado" })
    );
  }
});

module.exports = router;
