import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createRoutes } from './routes.js';

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const routes = createRoutes();
  app.use(routes);

  app.use((_req, res) => {
    res.status(404).json({
      error: 'Not Found',
      message: `Cannot ${_req.method} ${_req.path}`
    });
  });

  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    res.status(500).json({
      error: 'Internal Server Error',
      message: NODE_ENV === 'development' ? err.message : 'An error occurred'
    });
  });

  return app;
}

function startServer() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY environment variable is required');
    process.exit(1);
  }

  const app = createApp();

  app.listen(PORT, () => {
    console.log(`\nServer: http://localhost:${PORT}`);
    console.log(`Docs:   http://localhost:${PORT}/api/docs\n`);
  });
}

startServer();
