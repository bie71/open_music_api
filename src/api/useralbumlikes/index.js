const AlbumsLikesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'albumslikes',
  version: '1.0.0',
  register: async (server, {
    albumLikesService,
  }) => {
    const albumsLikesHandler = new AlbumsLikesHandler(
      albumLikesService,
    );
    server.route(routes(albumsLikesHandler));
  },
};
