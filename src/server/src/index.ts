import 'reflect-metadata';
import 'dotenv-safe/config';
import express from 'express';
import path from 'path';
import { createConnection } from 'typeorm';
import cors from 'cors';
import fs from 'fs';
import util from 'util';
import multer from 'multer';
import { __prod__ } from './constants';
import { Post } from './entities/Post';
import { uploadFile, getFileStream } from './utils/uploadPicture';

const upload = multer({ dest: 'uploads/' });

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    migrations: [path.join(__dirname, './migrations/*')],
    synchronize: true,
    entities: [Post],
  });
  // await conn.runMigrations();

  const app = express();

  app.set('trust proxy', 1); // Let Express know about nginx proxies
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN!,
      credentials: true,
    }),
  );

  const unlinkFile = util.promisify(fs.unlink);

  app.post('/images', upload.single('picture'), async (req, res) => {
    const file = req.file;
    console.log(file);
    await uploadFile(file);
    // err handling here...
    const result = await uploadFile(file);
    await unlinkFile(file.path);

    console.log(result);
    res.send(result);
  });

  app.get('/images/:key', (req, res) => {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe;
  });

  app.listen(process.env.PORT!, () => {
    console.log(`Server running on http://localhost:${process.env.PORT} ✅`);
  });
};
main().catch((e) => {
  console.error(e);
});
