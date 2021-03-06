// pages/api/readfiles.js
import fs from 'fs'
import path from 'path'
const maxAge = 1 * 24 * 60 * 60;

export default (req, res) => {

  const dirRelativeToPublicFolder = 'sponsor'
  const dir = path.resolve('./public', dirRelativeToPublicFolder);
  const filenames = fs.readdirSync(dir);
  const images = filenames.map(name => path.join('/', dirRelativeToPublicFolder, name))

  res.statusCode = 200
  res.setHeader('cache-control', `public, max-age=${maxAge}`);
  res.json(images);
}