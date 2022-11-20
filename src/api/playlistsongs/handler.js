/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
const autoBind = require('auto-bind');

class PlaylistSongsHandler {
  constructor(playlistsService, songsService, playlistSongsService, playlistSongActivitiesService, validator) {
    this._playlistsService = playlistsService;
    this._songsService = songsService;
    this._playlistSongsService = playlistSongsService;
    this._playlistSongActivitiesService = playlistSongActivitiesService;
    this._validator = validator;

    autoBind(this);
  }

  async postPlaylistSongsHandler(request, h) {
    this._validator.validatePlaylisSongstPayload(request.payload);
    const { songId } = request.payload;
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._songsService.getSongById(songId);
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._playlistSongsService.addPlaylistSongs(playlistId, songId);
    await this._playlistSongActivitiesService.addPlaylistSongActivities(playlistId, songId, credentialId, 'add');
    const response = h.response({
      status: 'success',
      message: 'Song berhasil ditambahkan ke Playlist',
    });

    response.code(201);
    return response;
  }

  async getPlaylistSongsHandler(request) {
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const playlist = await this._playlistsService.getPlaylistByIdAndOwner(playlistId, credentialId);
    const songs = await this._playlistSongsService.getPlaylistSongsOwner(playlistId);
    return {
      status: 'success',
      data: {
        playlist: {
          ...playlist,
          songs,
        },
      },
    };
  }

  async deletePlaylistSongsByIdHandler(request) {
    this._validator.validatePlaylisSongstPayload(request.payload);
    const { songId } = request.payload;
    const { playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._playlistSongsService.deletePlaylistSongs(songId);
    await this._playlistSongActivitiesService.addPlaylistSongActivities(playlistId, songId, credentialId, 'delete');
    return {
      status: 'success',
      message: 'Song berhasil dihapus dari playlist',
    };
  }
}

module.exports = PlaylistSongsHandler;
