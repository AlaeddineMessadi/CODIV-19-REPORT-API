import casesRouter from './api/controllers/cases/router';

export default function routes(app) {
  app.use('/api/v1/cases', casesRouter);
}
