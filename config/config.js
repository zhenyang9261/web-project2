module.exports = {
  development: {
    username: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: "exampledb",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "testdb",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
