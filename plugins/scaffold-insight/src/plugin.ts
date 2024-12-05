import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const scaffoldInsightPlugin = createPlugin({
  id: 'scaffold-insight',
  routes: {
    root: rootRouteRef,
  },
});

export const ScaffoldInsightPage = scaffoldInsightPlugin.provide(
  createRoutableExtension({
    name: 'ScaffoldInsightPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
