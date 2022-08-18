const express = require("express");
const Contenedor = require("./Contenedor");

const productosRoutes = require("./productosRoutes");
const carritosRoutes = require("./carritosRoutes");

const app = express();

const PORT = 8080;
const ARCHIVO_PRODUCTOS = "productos.txt";
const ARCHIVO_CARRITOS = "carritos.txt";

const contenedorProductos = new Contenedor({ filename: ARCHIVO_PRODUCTOS });
const contenedorCarritos = new Contenedor({ filename: ARCHIVO_CARRITOS });

const esAdministrador = true;

const server = app.listen(PORT, async () => {
  // await contenedor.deleteAll();

  // await contenedor.save({
  //   title: "galletas opera",
  //   price: 200,
  //   thumbnail: "https://images.com(opera",
  // });

  // await contenedor.save({
  //   title: "galletas mana",
  //   price: 220,
  //   thumbnail: "https://images.com(mana",
  // });

  // await contenedor.save({
  //   title: "galletas traviata",
  //   price: 240,
  //   thumbnail: "https://images.com(traviata",
  // });
  console.log(`Servidor http escuchando en puerto ${PORT}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.use("/api/productos", productosRoutes);
app.use("/api/carrito", carritosRoutes);
// app
//   .route("/api/productos")
//   .get(function (req, res) {
//     res.send("Get a random book");
//   })
//   .post(function (req, res) {
//     res.send("Add a book");
//   })
//   .put(function (req, res) {
//     res.send("Update the book");
//   })
//   .delete(function (req, res) {
//     res.send("Update the book");
//   });

// app
//   .route("/api/carrito")
//   .get(function (req, res) {
//     res.send("Get a random book");
//   })
//   .post(function (req, res) {
//     res.send("Add a book");
//   })
//   .put(function (req, res) {
//     res.send("Update the book");
//   })
//   .delete(function (req, res) {
//     res.send("Update the book");
//   });
// app.get("/productos", async (req, res) => {
//   const productos = await contenedor.getAll();
//   res.send(productos);
// });

// app.get("/productosRandom", async (req, res) => {
//   const productos = await contenedor.getAll();
//   const indexToReturn = Math.floor(Math.random() * productos.length);
//   res.send(productos[indexToReturn]);
// });
