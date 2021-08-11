function getDatabaseName() {
  let dbName = process.env.MONGO_COLL;

  switch (process.env.NODE_ENV.toLowerCase()) {
    default: throw new Error(`Unknown NODE_ENV ${process.env.NODE_ENV}`);
    case 'prod': break;
    case 'production': break;
    case 'dev':
      dbName = `${process.env.MONGO_COLL}-dev`;
      break;
    case 'development':
      dbName = `${process.env.MONGO_COLL}-dev`;
      break;
    case 'test':
      dbName = `${process.env.MONGO_COLL}-test`;
      break;
  }

  return dbName;
}

export default getDatabaseName;
