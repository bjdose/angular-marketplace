import { appRoutes } from './app.routes';

// TODO: add appconfig interface
export const appConfig = {
  routes: appRoutes,
  api: {
    prefix: '/api/',
    routes: {
      auth: {
        login: 'auth/login',
        register: 'auth/register',
      },
      product: {
        create: 'product/create',
        all: 'product/all',
        search: 'product/search',
      },
      admin: {
        report: {
          products: 'products',
        },
      },
    },
  },
};
