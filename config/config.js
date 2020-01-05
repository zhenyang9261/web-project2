module.exports = {
  development: {
    username: "root",
    password: "Panthers123",
    database: "Pillow",
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
    use_redis_env_variable: "REDIS_URL",
    use_rapidapi_env_variable: "RAPIDAPI",
    dialect: "mysql"
  }
};
