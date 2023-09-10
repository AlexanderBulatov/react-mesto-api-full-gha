const {
  NODE_ENV,
  ALLOWED_CORS,
  JWT_SECRET = 'some-secret-key',
  PORT = 3000,
  DB_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const allowedCors = NODE_ENV === 'production'
  ? ALLOWED_CORS.split(', ')
  : [
    'http://localhost:3001',
    'http://localhost:3000',
  ];

module.exports = {
  allowedCors,
  JWT_SECRET,
  PORT,
  DB_URL,
};
