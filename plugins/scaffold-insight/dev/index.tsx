import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { scaffolderAnalyticsPlugin, ScaffolderAnalyticsPage } from '../src/plugin';

createDevApp()
  .registerPlugin(scaffolderAnalyticsPlugin)
  .addPage({
    element: <ScaffolderAnalyticsPage />,
    title: 'Root Page',
    path: '/scaffolderanalytics',
  })
  .render();
