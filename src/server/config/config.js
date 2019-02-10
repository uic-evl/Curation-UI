const env = process.env.NODE_ENV || 'development';
console.log('env ******', env);

if (env === 'development'){
  process.env.PORT = 3050;
  process.env.CURATION = `http://localhost:${process.env.PORT}/`;
} else if (env === 'dev'){
  // process.env.PORT = 3000;
  process.env.CURATION = `http://localhost:${process.env.PORT}/`;
}

module.exports = {
  secret: 'jhfuecnckdiekkdiven342w!',
}