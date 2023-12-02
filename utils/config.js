const { NODE_ENV, JWT_SECRET, MONGODB_URI } = process.env;

const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
const MONGO_URL = MONGODB_URI || 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  SECRET_KEY,
  MONGO_URL,
};
