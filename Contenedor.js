const fs = require("fs");

class Contenedor {
  constructor({ filename }) {
    this._filename = filename;
  }

  async save(object) {
    const contenido = await this.getAll();
    let proximoId = 1;

    contenido.forEach((objetoActual) => {
      if (objetoActual.id >= proximoId) {
        proximoId = objetoActual.id + 1;
      }
    });

    try {
      const nuevoContenido = [...contenido, { ...object, id: proximoId }];
      await fs.promises.writeFile(
        this._filename,
        JSON.stringify(nuevoContenido, null, 2)
      );
      console.log("Objeto guardado correctamente.");
    } catch (error) {
      console.log(`Error al intentar guardar el objetos: ${error}`);
    }
  }

  async getById(id) {
    const contenido = await this.getAll();
    return contenido.find((objetoActual) => objetoActual.id === id);
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this._filename, "utf-8");
      return JSON.parse(contenido);
    } catch (error) {
      console.log(`Error al intentar leer los objetos: ${error}`);
      return [];
    }
  }

  async deleteById(id) {
    const contenido = await this.getAll();

    try {
      const nuevoContenido = contenido.filter(
        (objetoActual) => objetoActual.id !== id
      );
      await fs.promises.writeFile(
        this._filename,
        JSON.stringify(nuevoContenido, null, 2)
      );
      console.log("Objeto eliminado correctamente.");
    } catch (error) {
      console.log(`Error al intentar borrar el objetos: ${error}`);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this._filename, JSON.stringify([], null, 2));
      console.log("Se eliminaron todos los objetos correctamente.");
    } catch (error) {
      console.log(`Error al intentar eliminar todos los objetos: ${error}`);
    }
  }
}

module.exports = Contenedor;
