const db = require("../config/db");

const Patient = {
  create: (patientData, callback) => {
    const {
      first_name,
      last_name,
      dob,
      gender,
      email,
      contact,
      emergency_contact,
      address,
      doctor_id,
      created_At,
    } = patientData;
    const query =
      "INSERT INTO patients (first_name, last_name, dob, gender, email, contact, emergency_contact, address, doctor_id, created_At) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [
        first_name,
        last_name,
        dob,
        gender,
        email,
        contact,
        emergency_contact,
        address,
        doctor_id,
        created_At,
      ],
      (err, results) => {
        if (err) return callback(err);
        callback(null, results);
      }
    );
  },

  getAll: (callback) => {
    const query = "SELECT * FROM patients";
    db.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    const query = "SELECT * FROM patients WHERE patient_id = ?";
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  update: (id, patientData, callback) => {
    let updateFields = [];
    let values = [];

    Object.keys(patientData).forEach((key) => {
      if (patientData[key] !== undefined) {
        updateFields.push(`${key} = ?`);
        values.push(patientData[key]);
      }
    });

    if (updateFields.length === 0) {
      return callback({ message: "No fields to update" });
    }

    values.push(id); // Add ID at the end for the WHERE condition
    const query = `UPDATE patients SET ${updateFields.join(
      ", "
    )} WHERE patient_id = ?`;

    db.query(query, values, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  delete: (id, callback) => {
    const query = "DELETE FROM patients WHERE patient_id = ?";
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
};

module.exports = Patient;
