const sql = require("mssql");
const config = {
    user: 'sql-server-admin-dev',          // sql admin username
    password: 'V@ishali@123',  // sql password
    server: 'sql-server-cloud-app-dev.privatelink.database.windows.net',      // your-server.database.windows.net
    database: 'sql-db-app-dev',
    options: {
        encrypt: true,                  // required for Azure SQL
        trustServerCertificate: true
    }
};

module.exports = {
  sql,
  config
};
