var config = {
  noAPI: {
    API  :  'http://localhost:8888/',
    mode : 'dev',
    port : 4000
  },
  local: {
    API  :  'http://ateneo-api:8888/',
    mode : 'dev',
    port : 4000
  },
  dev: {
    API:  'http://ateneo-api:8888/',
    mode: 'dev',
    port : 7000
  },
  production: {
    mode: 'production',
    API:  'http://paraisapi:8453/',
    port: 4000
  }
};

module.exports = function ( mode ) {
  return config[ mode || process.argv[ 2 ] || 'local' ] || config.local;
};
