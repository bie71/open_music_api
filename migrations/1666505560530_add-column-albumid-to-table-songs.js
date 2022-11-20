/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addColumn('songs', {
    albumId: {
      type: 'VARCHAR(50)',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('songs', 'albumId');
};
