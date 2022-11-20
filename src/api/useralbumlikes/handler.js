/* eslint-disable no-underscore-dangle */
const autoBind = require('auto-bind');

class AlbumsLikesHandler {
  constructor(userAlbumLikesService) {
    this._service = userAlbumLikesService;

    autoBind(this);
  }

  async postAlbumLikeHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.findAlbum(id);
    const result = await this._service.findLike(credentialId, id);
    if (!result.length) {
      await this._service.addLike(credentialId, id);
      const response = h.response({
        status: 'success',
        message: 'Album telah disukai.',
      });

      response.code(201);
      return response;
    }

    await this._service.deleteLike(credentialId, id);
    const response = h.response({
      status: 'success',
      message: 'Album batal disukai.',
    });

    response.code(201);
    return response;
  }

  async getAlbumLikeHandler(request, h) {
    const { id } = request.params;

    await this._service.findAlbum(id);
    const count = await await this._service.getLike(id);
    const cache = count.split('+').includes('cache');
    const likes = parseInt(count, 10);

    if (cache) {
      const response = h.response({
        status: 'success',
        data: {
          likes,
        },
      });
      response.header('X-Data-Source', 'cache');
      return response;
    }

    const response = h.response({
      status: 'success',
      data: {
        likes,
      },
    });
    return response;
  }
}

module.exports = AlbumsLikesHandler;
