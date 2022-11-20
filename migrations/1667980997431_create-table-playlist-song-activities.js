/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('playlists_song_activities', {
    id: {
      type: 'varchar(50)',
      notNull: true,
      primaryKey: true,
    },
    playlist_id: {
      type: 'varchar(50)',
    },
    song_id: {
      type: 'varchar(50)',
    },
    user_id: {
      type: 'varchar(50)',
    },
    action: {
      type: 'varchar(50)',
    },
    time: {
      type: 'TEXT',
    },

  });
  pgm.addConstraint('playlists_song_activities', 'fk_playlists_song_activities.playlist_id_playlists.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('playlists_song_activities', 'fk_playlists_song_activities.playlist_id_playlists.id');
  pgm.dropTable('playlists_song_activities');
};
