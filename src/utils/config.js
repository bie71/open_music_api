const config = {
  app: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  s3: {
    bucketName: process.env.AWS_BUCKET_NAME,
  },
  rabbitMq: {
    server: process.env.RABBITMQ_SERVER,
  },
  redis: {
    host: process.env.REDIS_SERVER,
    port: process.env.REDIS_PORT,
  },
  jwt: {
    accessTokenKey: process.env.ACCESS_TOKEN_KEY,
    refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
    maxAgeSec: process.env.ACCESS_TOKEN_AGE,
  },
};

module.exports = config;
