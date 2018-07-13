var env = process.env.NODE_ENV || 'development';
console.log('env ******', env);

if (env === 'development'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/curation_dev';
  console.log("connecting to " + process.env.MONGODB_URI);
} else if (env === 'test'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/curation_test';
}