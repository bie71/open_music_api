const routes = (handler) => [
  {
    method: 'GET',
    path: '/playlists/{playlistId}/activities',
    handler: handler.getPlaylistSongActivitiesHandler,
    options: {
      auth: 'musicapiapps_jwt',
    },
  },
];

module.exports = routes;
