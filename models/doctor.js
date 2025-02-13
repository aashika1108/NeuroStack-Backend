const db = require('../config/db');

const Doctor = {
  create: (doctorData, callback) => {
    const { first_name, last_name, email, password, contact, specialization, subscription, created_At } = doctorData;
    const query = 'INSERT INTO doctors (first_name, last_name, email, password, contact, specialization, subscription, created_At) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [first_name, last_name, email, password, contact, specialization, subscription, created_At], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM doctors';
    db.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM Doctors WHERE doctor_id = ?;';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  update: (id, doctorData, callback) => {
    const { first_name, last_name, email, password, contact, specialization, subscription, created_At } = doctorData;
    const query = 'UPDATE doctors SET first_name = ?, last_name = ?, email = ?, password = ?, contact = ?, specialization = ?, subscription = ?, created_At = ? WHERE doctor_id = ?';
    db.query(query, [first_name, last_name, email, password, contact, specialization, subscription, created_At, id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM doctors WHERE doctor_id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
};

module.exports = Doctor;
