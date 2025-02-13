const Disorder = require('../models/disorder');

exports.createDisorder = (req, res) => {
  Disorder.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Disorder created successfully', disorder: result });
  });
};

exports.getAllDisorders = (req, res) => {
  Disorder.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ disorders: results });
  });
};

exports.getDisorderById = (req, res) => {
  const { id } = req.params;
  Disorder.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ disorder: result });
  });
};

exports.updateDisorder = (req, res) => {
  const { id } = req.params;
  Disorder.update(id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Disorder not found' });
    res.status(200).json({ message: 'Disorder updated successfully', disorder: result });
  });
};

exports.deleteDisorder = (req, res) => {
  const { id } = req.params;
  Disorder.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Disorder not found' });
    res.status(200).json({ message: 'Disorder deleted successfully' });
  });
};
