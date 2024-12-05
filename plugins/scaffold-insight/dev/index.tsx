import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { scaffoldInsightPlugin, ScaffoldInsightPage } from '../src/plugin';

createDevApp()
  .registerPlugin(scaffoldInsightPlugin)
  .addPage({
    element: <ScaffoldInsightPage />,
    title: 'Root Page',
    path: '/scaffold-insight',
  })
  .render();
