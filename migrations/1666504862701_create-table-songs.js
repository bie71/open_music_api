/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'varchar(50)',
      notNull: true,
      primaryKey: true,
    },
    title: {
      type: 'varchar(200)',
      notNull: true,
    },
    year: {
      type: 'integer',
      notNull: true,
    },
    genre: {
      type: 'varchar(200)',
      notNull: true,
    },
    performer: {
      type: 'varchar(200)',
      notNull: true,
    },
    duration: {
      type: 'integer',
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => { pgm.dropTable('songs'); };
