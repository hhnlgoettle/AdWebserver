function getDatabaseName() {
  let dbName = process.env.MONGO_DB;

  switch (process.env.NODE_ENV.toLowerCase()) {
    default: throw new Error(`Unknown NODE_ENV ${process.env.NODE_ENV}`);
    case 'prod': break;
    case 'production': break;
    case 'dev':
      dbName = `${dbName}-dev`;
      break;
    case 'development':
      dbName = `${dbName}-dev`;
      break;
    case 'test':
      dbName = `${dbName}-test`;
      break;
  }

  return dbName;
}

export default getDatabaseName;
