// const sql = require("mssql");
// const config = {
//     user: 'sql-server-admin-dev',          // sql admin username
//     password: 'V@ishali@123',  // sql password
//     server: 'sql-server-cloud-app-dev.privatelink.database.windows.net',      // your-server.database.windows.net
//     database: 'sql-db-app-dev',
//     options: {
//         encrypt: true,                  // required for Azure SQL
//         trustServerCertificate: true,
//         enableArithAbort: true,
//     },
//     pool: {
//     max: 10,
//     min: 0,
//     idleTimeoutMillis: 30000
//   },
//   connectionTimeout: 30000,
//   requestTimeout: 30000
// };

// async function getPool() {
//   return sql.connect(config);
// }
const { sql, config } = require('../../database/db')
let pool;

async function getPool() {
  if (pool) return pool;
  pool = await sql.connect(config);
  console.log('✅ Connected to Azure SQL');
  return pool;
}

module.exports = {
  // READ ALL (with optional filter)
  async findAll(filter = 'all') {
    console.log('📡 Fetching books from DB, filter:', filter);

    const pool = await getPool();
    let query = 'SELECT * FROM Books';

    // if (filter === 'read') {
    //   query += " WHERE status = 'read'";
    // } else if (filter === 'unread') {
    //   query += " WHERE status = 'unread'";
    // }

    // query += ' ORDER BY createdAt DESC';

    const result = await pool.request().query(query);
    return result.recordset;
  },

  // CREATE
  async create(book) {
    const pool = await getPool();

    await pool.request()
      .input('title', sql.NVarChar(255), book.title)
      .input('author', sql.NVarChar(255), book.author)
      .input('status', sql.NVarChar(50), book.status || 'unread')
      .input('thumbnail', sql.NVarChar(255), book.thumbnail)
      .query(`
        INSERT INTO Books (title, author, status, thumbnail)
        VALUES (@title, @author, @status, @thumbnail)
      `);
  }
};







//module.exports = {
  // CREATE
//   async create(book) {
//     const pool = await getPool();
//     const result = await pool.request()
//       .input('title', sql.NVarChar(255), book.title)
//       .input('author', sql.NVarChar(255), book.author)
//       .input('genre', sql.NVarChar(100), book.genre)
//       .input('status', sql.NVarChar(50), book.status)
//       .query(`
//         INSERT INTO Books (title, author, genre, status)
//         OUTPUT INSERTED.id, INSERTED.title, INSERTED.author, INSERTED.genre, INSERTED.status
//         VALUES (@title, @author, @genre, @status)
//       `);
//     return result.recordset[0];
//   },

  // READ ALL
//   async findAll() {
//     const pool = await getPool();
//     const result = await pool.request()
//       .query('SELECT * FROM Books');
//     return result.recordset;
//   },

    // async findAll() {
    // console.log('📡 Fetching books from DB');
    // const pool = await getPool();
    // const result = await pool.request().query('SELECT * FROM Books');
    // console.log('✅ Books fetched:', result.recordset.length);
    // return result.recordset;
    // }

//   // READ BY TITLE
//   async findByTitle(title) {
//     const pool = await getPool();
//     const result = await pool.request()
//       .input('title', sql.NVarChar(255), title)
//       .query('SELECT * FROM Books WHERE title = @title');
//     return result.recordset[0];
//   },

//   // UPDATE
//   async updateStatus(id, status) {
//     const pool = await getPool();
//     const result = await pool.request()
//       .input('id', sql.Int, id)
//       .input('status', sql.NVarChar(50), status)
//       .query(`
//         UPDATE Books
//         SET status = @status
//         WHERE id = @id
//       `);
//     return result.rowsAffected[0] > 0;
//   },

//   // DELETE
//   async destroy(id) {
//     const pool = await getPool();
//     const result = await pool.request()
//       .input('id', sql.Int, id)
//       .query('DELETE FROM Books WHERE id = @id');
//     return result.rowsAffected[0] > 0;
//   }
//};
