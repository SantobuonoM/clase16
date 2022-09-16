import knex from "knex";

export class Container {
  constructor(config, tableName) {
    this.config = config;
    this.tableName = tableName;
    this.knexCli = knex(this.config);
  }
  async insertar(obj) {
    return await this.knexCli
      .from(this.tableName)
      .insert(obj)
      .then(() => console.log("Saved"))
      .catch((err) => {
        console.log(err);
        throw err;
      });
    //.finally(() => this.knexCli.destroy());
  }
  async listar(id) {
    try {
      return await this.knexCli
        .from(this.tableName)
        .select("*")
        .where({ id: id });
    } catch (error) {
      throw error;
    }
  }
  async listarAll() {
    try {
      return await this.knexCli
        .from(this.tableName)
        .select("*")
        .orderBy("id", "asc");
    } catch (error) {
      throw error;
    }
  }
  async eliminar(id) {
    try {
      return await this.knexCli.from(this.tableName).where({ id: id }).del();
    } catch (error) {
      throw error;
    }
  }

  async actualizar(id, obj) {
    try {
      return await this.knexCli
        .from(this.tableName)
        .where({ id: id })
        .update(obj);
    } catch (error) {
      throw error;
    }
  }
}
