const config = {
    dev: {
      secret: 'ABx98XY',
      db: {
        host: 'salt.db.elephantsql.com',
        port: 5432,
        username: 'wkvfidkz',
        password: 'l_GL52Du0frCjJMfpUQyukzzf5NJsWCA',
        database: 'wkvfidkz',
      },
    },
    production: {
      secret: 'ABx98XY',
      db: {
        host: 'salt.db.elephantsql.com',
        port: 5432,
        username: 'wkvfidkz',
        password: 'l_GL52Du0frCjJMfpUQyukzzf5NJsWCA',
        database: 'wkvfidkz',
      },
    },
  };

export default config[process.env.NODE_ENV];
