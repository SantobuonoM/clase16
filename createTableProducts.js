import { optionsMariaDB } from "../clase16-app/options/config.js";
import knex from "knex";
export const knexCli = knex(optionsMariaDB.db);

//knexCli.schema.dropTableIfExists("products").then(() => {
knexCli.schema.hasTable("products").then((exists) => {
  if (!exists) {
    knexCli.schema
      .createTable("products", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("price").notNullable();
        table.string("img").notNullable();
      })
      .then(() => console.log("Table Created"))
      .catch((err) => {
        console.log(err);
        throw err;
      });
    //});
  } else {
    knexCli.schema.finally(() => {
      knexCli.destroy();
    });
  }
});
