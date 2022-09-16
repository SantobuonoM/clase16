import { fileURLToPath } from "url";
import path, { dirname } from "path";

export const optionsMariaDB = {
  db: {
    client: "mysql",
    //version: "8.0",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "1234",
      database: "ecommerce",
    },
    pool: { min: 0, max: 7 },
  },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const optionsSQLite3 = {
  db: {
    client: "better-sqlite3", // or 'better-sqlite3'
    connection: {
      filename: path.join(__dirname, "../db/ecommerce.db3"),
    },
    useNullAsDefault: true,
  },
};
