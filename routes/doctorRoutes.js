const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: API for managing doctors
 */

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of doctors
 */
router.get('/', doctorController.getAllDoctors);

/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Get a doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The doctor ID
 *     responses:
 *       200:
 *         description: Doctor details
 */
router.get('/:id', doctorController.getDoctorById);

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Create a new doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               contact:
 *                 type: string
 *               specialization:
 *                 type: string
 *               subscription:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Doctor created successfully
 */
router.post('/', doctorController.createDoctor);

/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     summary: Update a doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               contact:
 *                 type: string
 *               specialization:
 *                 type: string
 *               subscription:
 *                 type: boolean
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 */
router.put('/:id', doctorController.updateDoctor);

/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     summary: Delete a doctor
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 */
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;
