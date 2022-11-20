/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class PlaylistsService {
  constructor(collaborationsService) {
    this._pool = new Pool();
    this._collaborationsService = collaborationsService;
  }

  async addPlaylist(name, owner) {
    const id = `playlist-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
      values: [id, name, owner],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Playlist gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getPlaylist(owner) {
    const query = {
      text: `SELECT p.id, p.name, u.username FROM playlists p
      left JOIN collaborations c ON c.playlist_id = p.id
      JOIN users u ON p.owner =  u.id WHERE p.owner = $1 or c.user_id  = $1`,
      values: [owner],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async deletePlaylist(id, owner) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 AND owner = $2 RETURNING id',
      values: [id, owner],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }
  }

  async getPlaylistByIdAndOwner(playlistId, owner) {
    const query = {
      text: `SELECT p.id , p.name , u.username FROM playlists p JOIN users u ON u.id = p.owner
            LEFT JOIN collaborations c ON c.user_id = $2 OR p.owner = $2
              WHERE p.id = $1;`,
      values: [playlistId, owner],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async verifyOwnerPlaylist(id, owner) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('playlists tidak ditemukan');
    }
    const playlist = result.rows[0];
    if (playlist.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
    return result.rows;
  }

  async verifyPlaylistAccess(id, owner) {
    try {
      await this.verifyOwnerPlaylist(id, owner);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      try {
        await this._collaborationsService.verifyCollaborator(id, owner);
      } catch {
        throw error;
      }
    }
  }
}

module.exports = PlaylistsService;
