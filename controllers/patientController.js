const Patient = require('../models/patient');

exports.createPatient = (req, res) => {
  Patient.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Patient created successfully', patient: result });
  });
};

exports.getAllPatients = (req, res) => {
  Patient.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ patients: results });
  });
};

exports.getPatientById = (req, res) => {
  const { id } = req.params;
  Patient.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result.length) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json({ patient: result });
  });
};

exports.updatePatient = (req, res) => {
  const { id } = req.params;
  Patient.update(id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json({ message: 'Patient updated successfully', patient: result });
  });
};

exports.deletePatient = (req, res) => {
  const { id } = req.params;
  Patient.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json({ message: 'Patient deleted successfully' });
  });
};
