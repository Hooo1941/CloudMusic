import React from 'react';

const index = React.lazy(() => import('../pages/index'));
const login = React.lazy(() => import('../pages/login'));
const playlist = React.lazy(() => import('../pages/playlist'));
const searchlist = React.lazy(() => import('../pages/searchlist'));
const song = React.lazy(() => import('../pages/song'));
const APItest = React.lazy(() => import('../pages/APItest'));
const page404 = React.lazy(() => import('../pages/page404'));
const routes = [
  { path: '/', exact: true, component: index },
  { path: '/login', component: login },
  { path: '/playlist', component: playlist },
  { path: '/searchlist', component: searchlist },
  { path: '/song', component: song },
  { path: '/APItest', component: APItest },
  { component: page404 },
];
export default routes;
