import { createRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'scaffolderanalytics',
});

export const entityRootRouteRef = createRouteRef({
  id: 'scaffolderanalytics:entity-page',
  params: ['namespace', 'kind', 'name'],
});
