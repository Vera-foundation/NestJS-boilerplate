export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 8000,
  DATABASE_CONFIG: {
    HOST: process.env.DB_HOST,
    PORT: parseInt(process.env.DB_PORT, 10),
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
  },
  AUTH: {
    BCRYPT_GEN_SALT: parseInt(process.env.BCRYPT_GEN_SALT, 10) || 10,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME
  }
});