import 'reflect-metadata';
import 'dotenv-safe/config';
import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import cors from 'cors';
import { __prod__ } from './constants';
import { Post } from './entities/Post';
import { HelloResolver } from './resolvers/HelloResolver';
import { PostResolver } from './resolvers/PostResolver';

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: !__prod__,
    migrations: [path.join(__dirname, './migrations/*')],
    synchronize: !__prod__,
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

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });
  apolloServer.applyMiddleware({ app, cors: false });
  app.listen(process.env.PORT!, () => {
    console.log(`Server running on http://localhost:${process.env.PORT} ✅`);
  });
};
main().catch((e) => {
  console.error(e);
});
