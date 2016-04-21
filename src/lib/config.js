export default {
  port: process.env.SERVICE_PORT || 8001,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost'
};

//MONGO_URL="apiUser:password@159.203.222.174:27017/gamedb" npm start