/* eslint-disable no-underscore-dangle */
const autoBind = require('auto-bind');

class PlaylistSongActivitiesHandler {
  constructor(playlistSongActivitiesService, playlistsService) {
    this._service = playlistSongActivitiesService;
    this._playlistsService = playlistsService;

    autoBind(this);
  }

  async getPlaylistSongActivitiesHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { playlistId } = request.params;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const activities = await this._service.getPlaylistSongActivities(playlistId);

    return {
      status: 'success',
      data: {
        playlistId,
        activities,
      },
    };
  }
}

module.exports = PlaylistSongActivitiesHandler;
