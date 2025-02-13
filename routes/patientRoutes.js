const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: API for managing patients
 */

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: List of patients
 */
router.get("/", patientController.getAllPatients);

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Get a patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient details
 */
router.get("/:id", patientController.getPatientById);

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Create a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: First name of the patient
 *               last_name:
 *                 type: string
 *                 description: Last name of the patient
 *               dob:
 *                 type: string
 *                 format: date
 *                 description: Date of birth of the patient
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 description: Gender of the patient
 *               email:
 *                 type: string
 *                 description: Email of the patient
 *               contact:
 *                 type: string
 *                 description: Contact number of the patient
 *               emergency_contact:
 *                 type: string
 *                 description: Emergency contact number of the patient
 *               address:
 *                 type: string
 *                 description: Address of the patient
 *               doctor_id:
 *                 type: string
 *                 description: Doctor's ID to whom the patient is assigned
 *             required:
 *               - first_name
 *               - last_name
 *               - dob
 *               - gender
 *               - email
 *               - contact
 *               - emergency_contact
 *               - doctor_id
 *     responses:
 *       201:
 *         description: Patient created successfully
 */
router.post("/", patientController.createPatient);
/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Update a patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: First name of the patient
 *               last_name:
 *                 type: string
 *                 description: Last name of the patient
 *               dob:
 *                 type: string
 *                 format: date
 *                 description: Date of birth of the patient
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 description: Gender of the patient
 *               email:
 *                 type: string
 *                 description: Email of the patient
 *               contact:
 *                 type: string
 *                 description: Contact number of the patient
 *               emergency_contact:
 *                 type: string
 *                 description: Emergency contact number of the patient
 *               address:
 *                 type: string
 *                 description: Address of the patient
 *               doctor_id:
 *                 type: string
 *                 description: Doctor's ID to whom the patient is assigned
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *       400:
 *         description: Invalid request or missing required fields
 *       404:
 *         description: Patient not found
 */

router.put("/:id", patientController.updatePatient);

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Delete a patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID to update
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 */
router.delete("/:id", patientController.deletePatient);

module.exports = router;
