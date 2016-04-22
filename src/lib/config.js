export default {
  port: process.env.SERVICE_PORT || 8001,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost/gamedb'
};