/* eslint-disable no-underscore-dangle */
const autoBind = require('auto-bind');

class UploadsHandler {
  constructor(albumsService, storageService, validator) {
    this._albumsService = albumsService;
    this._storageService = storageService;
    this._validator = validator;

    autoBind(this);
  }

  async postUploadImageHandler(request, h) {
    const { cover } = request.payload;
    const { id } = request.params;
    this._validator.validateImageHeaders(cover.hapi.headers);
    const filename = await this._storageService.writeFile(cover, cover.hapi);
    const filelocation = `http://${process.env.HOST}:${process.env.PORT}/upload/cover/${filename}`;
    await this._albumsService.updateCover(id, filelocation);
    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
    response.code(201);
    return response;
  }
}
module.exports = UploadsHandler;
