import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { scaffolderanalyticsPlugin, ScaffolderanalyticsPage } from '../src/plugin';

createDevApp()
  .registerPlugin(scaffolderanalyticsPlugin)
  .addPage({
    element: <ScaffolderanalyticsPage />,
    title: 'Root Page',
    path: '/scaffolderanalytics',
  })
  .render();
