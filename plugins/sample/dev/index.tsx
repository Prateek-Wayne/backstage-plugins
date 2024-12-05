import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { samplePlugin, SamplePage } from '../src/plugin';

createDevApp()
  .registerPlugin(samplePlugin)
  .addPage({
    element: <SamplePage />,
    title: 'Root Page',
    path: '/sample',
  })
  .render();
