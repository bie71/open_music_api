/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistSongs(playlistId, songId) {
    const id = `playlist-songs-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlistsongs VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Song gagal ditambahkan');
    }
  }

  async getPlaylistSongs(playlistId) {
    const query = {
      text: 'SELECT playlist_id, song_id FROM playlistsongs WHERE playlist_id = $1 ',
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }
    return result.rows;
  }

  async deletePlaylistSongs(songId) {
    const query = {
      text: 'DELETE FROM playlistsongs WHERE song_id = $1 RETURNING id',
      values: [songId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Song tidak ditemukan');
    }
  }

  async getPlaylistSongsOwner(playlistId) {
    const query = {
      text: 'SELECT s.id, s.title, s.performer FROM playlistsongs p INNER JOIN songs s ON p.playlist_id  = $1 and p.song_id = s.id',
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    return result.rows;
  }
}

module.exports = PlaylistSongsService;
