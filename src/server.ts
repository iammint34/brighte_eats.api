import dotenv from 'dotenv';
import 'reflect-metadata';
import express, { Application } from 'express';
import cors from 'cors';
import { ApolloServer, ServerRegistration } from 'apollo-server-express';
import createSchema from './createSchema';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';

dotenv.config();

const startServer = async () => {
  const app: Application = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: '5mb' }));

  app.use(cors());

  const schema = await createSchema();

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  // Import all routes
  require('./routes/index')(app);

  // Apply the Apollo GraphQL middleware and set the path to /graphql
  server.applyMiddleware({ app, path: '/graphql' } as ServerRegistration);

  // Error handling middleware
  app.use(errorHandlerMiddleware);

  app.listen(process.env.NODE_PORT || 3000, () => {
    console.log('Server is running on http://localhost:4000');
  });
};

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
