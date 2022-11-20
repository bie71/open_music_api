/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('playlists', {
    id: {
      type: 'varchar(50)',
      notNull: true,
      primaryKey: true,
    },
    name: {
      type: 'varchar(200)',
      notNull: true,
    },
    owner: {
      type: 'varchar(50)',
      notNull: true,
    },

  });
  pgm.addConstraint('playlists', 'fk_playlists.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('playlists', 'fk_playlists.owner_users.id');
  pgm.dropTable('playlists');
};
