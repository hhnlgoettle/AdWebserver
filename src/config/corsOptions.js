const envWhitelist = process.env.CORS_WHITELIST;
const { CORS_ALLOW_ALL = false } = process.env;
// parse whitelist. if whitelist is read as string parse to array
// eslint-disable-next-line no-nested-ternary
const whitelist = (envWhitelist == null) ? [] : (typeof envWhitelist) === 'string' ? JSON.parse(envWhitelist) : envWhitelist;

/* Configuration functions */
const corsOptionsDelegate = function (req, callback) {
  const corsOptions = {
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  };
  corsOptions.origin = false; // disable CORS by default
  if (CORS_ALLOW_ALL === true || CORS_ALLOW_ALL === 'true') {
    corsOptions.origin = true;
  }
  // if origin matches origin, allow CORS
  if (typeof req.header('Origin') !== 'undefined') {
    const headOriginal = req.header('Origin');
    const whitelistFilter = whitelist.filter((x) => typeof x === 'string' && headOriginal.indexOf(x) >= 0);
    if (whitelistFilter.length > 0) {
      corsOptions.origin = true; // reflect (enable) the requested origin in the CORS response
    }
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

export default corsOptionsDelegate;
