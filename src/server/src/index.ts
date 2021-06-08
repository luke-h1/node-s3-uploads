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
import { Post } from './entity/Post';
import { uploadFile, getFileStream } from './utils/uploadPicture';

const upload = multer({ dest: 'uploads/' });

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: !__prod__,
    synchronize: !__prod__,
    migrations: [path.join(__dirname, './migrations/*.*')],
    entities: [
      `${__dirname}/entity/*.*`,
    ],
  });
  await Post.create({
    pictureUrl: 'https://www.google.com',
  }).save();

  const app = express();

  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN!,
      credentials: true,
    }),
  );

  const unlinkFile = util.promisify(fs.unlink);

  app.post('/images', upload.single('picture'), async (req, _) => {
    const file = req.file;
    console.log(file);
    await uploadFile(file);
    // err handling here...
    const result = await uploadFile(file);
    await unlinkFile(file.path);
    return Post.create({
      pictureUrl: (result) as string,
    }).save();
  });

  app.get('/images/:key', (req, _) => {
    const key = req.params.key;
    const readStream = getFileStream(key);
    // @ts-ignore
    readStream.pipe;
  });

  app.listen(process.env.PORT!, () => {
    console.log(`Server running on http://localhost:${process.env.PORT} ✅`);
  });
};
main().catch((e) => {
  console.error(e);
});
