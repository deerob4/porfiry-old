import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import FilterMonitor from 'redux-devtools-filter-actions';

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-q"
               defaultSize={0.12}>
    <FilterMonitor blacklist={['DECREMENT_TIME_LEFT']}>
      <LogMonitor />
    </FilterMonitor>
  </DockMonitor>
);

export default DevTools;
