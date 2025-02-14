const db = require("../config/db");

const Doctor = {
  create: (doctorData, callback) => {
    const {
      first_name,
      last_name,
      email,
      password,
      contact,
      specialization,
      subscription,
      created_At,
    } = doctorData;
    const query =
      "INSERT INTO doctors (first_name, last_name, email, password, contact, specialization, subscription, created_At) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [
        first_name,
        last_name,
        email,
        password,
        contact,
        specialization,
        subscription,
        created_At,
      ],
      (err, results) => {
        if (err) return callback(err);
        callback(null, results);
      }
    );
  },

  getAll: (callback) => {
    const query = "SELECT * FROM doctors";
    db.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    const query = "SELECT * FROM Doctors WHERE doctor_id = ?;";
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  update: (id, doctorData, callback) => {
    let fields = [];
    let values = [];

    // Iterate over doctorData object to build query dynamically
    for (const key in doctorData) {
      if (doctorData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(doctorData[key]);
      }
    }

    // If no valid fields are provided, return an error
    if (fields.length === 0) {
      return callback(new Error("No fields provided for update."));
    }

    // Construct query dynamically
    const query = `UPDATE doctors SET ${fields.join(", ")} WHERE doctor_id = ?`;
    values.push(id); // Add id at the end for the WHERE clause

    // Execute the query
    db.query(query, values, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  
  delete: (id, callback) => {
    const query = "DELETE FROM doctors WHERE doctor_id = ?";
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
};

module.exports = Doctor;
