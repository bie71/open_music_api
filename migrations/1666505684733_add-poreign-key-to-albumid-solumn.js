/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addConstraint('songs', 'fk_albums.albumId.id', 'FOREIGN KEY("albumId") REFERENCES albums(id) ON DELETE CASCADE');
};

exports.down = (pgm) => { pgm.dropConstraint('songs', 'fk_albums.albumId.id'); };
