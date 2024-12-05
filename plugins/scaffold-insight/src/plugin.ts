import {
  configApiRef,
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
  fetchApiRef,
  identityApiRef,
} from '@backstage/core-plugin-api';
import { entityRootRouteRef, rootRouteRef } from './routes';
import {
  scaffolderAnalyticsApiRef,
  ScaffolderAnalyticsClient,
} from './api/api';

export const scaffolderAnalyticsPlugin = createPlugin({
  id: 'scaffolderanalytics',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: scaffolderAnalyticsApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        configApi: configApiRef,
        identityApi: identityApiRef,
        fetchApi: fetchApiRef,
      },
      factory: ({ discoveryApi, identityApi, fetchApi }) => {
        return new ScaffolderAnalyticsClient({
          discoveryApi,
          identityApi,
          fetchApi,
        });
      },
    }),
  ],
});

export const ScaffolderAnalyticsPage = scaffolderAnalyticsPlugin.provide(
  createRoutableExtension({
    name: 'ScaffolderanalyticsPage',
    component: () =>
      import('./components/ScaffolderAnalytics').then(
        m => m.AnalyticsDashBoard,
      ),
    mountPoint: entityRootRouteRef,
  }),
);
