import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const samplePlugin = createPlugin({
  id: 'sample',
  routes: {
    root: rootRouteRef,
  },
});

export const SamplePage = samplePlugin.provide(
  createRoutableExtension({
    name: 'SamplePage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
