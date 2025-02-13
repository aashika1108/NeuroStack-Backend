const Doctor = require('../models/doctor');

exports.createDoctor = (req, res) => {
  Doctor.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Doctor created successfully', doctor: result });
  });
};

exports.getAllDoctors = (req, res) => {
  Doctor.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ doctors: results });
  });
};

exports.getDoctorById = (req, res) => {
  const { id } = req.params;
  console.log(id);
  Doctor.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result.length) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json({ doctor: result });
  });
};

exports.updateDoctor = (req, res) => {
  const { id } = req.params;
  Doctor.update(id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json({ message: 'Doctor updated successfully', doctor: result });
  });
};

exports.deleteDoctor = (req, res) => {
  const { id } = req.params;
  Doctor.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json({ message: 'Doctor deleted successfully' });
  });
};
