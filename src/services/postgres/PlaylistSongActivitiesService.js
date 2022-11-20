/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class PlaylistSongActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistSongActivities(playlistId, songId, userId, action) {
    const id = `playlistSongActivities-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlists_song_activities VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, playlistId, songId, userId, action, time],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('activities gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getPlaylistSongActivities(playlistId) {
    const query = {
      text: 'select  u.username, s.title ,psa.action  , psa.time from playlists_song_activities psa  join users u on psa.user_id  = u.id join songs s on psa.song_id = s.id where  psa.playlist_id = $1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('activities tidak ditemukan');
    }

    return result.rows;
  }
}
module.exports = PlaylistSongActivitiesService;
