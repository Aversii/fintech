import connection from "./connection";
import users from "./tablesPopulation/users.json"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) };

const createTables = () => connection
   .raw(`
   CREATE TABLE IF NOT EXISTS fintech_users(
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      balance DECIMAL(10,2) DEFAULT 0.00 NOT NULL,
      role ENUM ("NORMAL","ADMIN") NOT NULL DEFAULT ("NORMAL"),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE IF NOT EXISTS fintech_revenue(
      id VARCHAR(255) PRIMARY KEY,
      valor DECIMAL(10,2) NOT NULL,
      user_id VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES fintech_users (id)
   );

   CREATE TABLE IF NOT EXISTS fintech_expense(
      id VARCHAR(255) PRIMARY KEY,
      valor DECIMAL(10,2) NOT NULL,
      user_id VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES fintech_users (id)
   );
`)

   .then(() => { console.log("As tabelas foram criadas!") })
   .catch(printError);

   
const insertUsers = () => connection("fintech_users")
.insert(users)
.then(() => { console.log("Tabela users foi criada e populada com sucesso!!") })
.catch(printError);


const closeConnection = () => { connection.destroy() }

createTables()
   .then(insertUsers) 
   .finally(closeConnection);
