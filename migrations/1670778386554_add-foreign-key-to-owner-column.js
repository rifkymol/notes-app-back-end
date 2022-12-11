/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // creating new user
  pgm.sql("INSERT INTO users(id, username, password, fullname) VALUES('old_notes', 'old_notes', 'old_notes', 'old_notes') ");

  // change the owner value of a note whose owner is NULL
  pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner IS NULL");

  // give constraint to foreign key to owner on id colomn on users table
  pgm.addConstraint('notes', 'fk_notes.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // delete constraint fk_notes.owner_users.id on table notes
  pgm.dropConstraint('notes', 'fk_notes.owner_users.id');
 
  // change owner old_notes value on note to NULL
  pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old_notes'");
 
  // delete new user.
  pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};
