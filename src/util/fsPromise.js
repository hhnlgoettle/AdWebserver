import util from 'util';
import fs from 'fs';

const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);
const rmdir = util.promisify(fs.rmdir);

export default { readdir, unlink, rmdir };
