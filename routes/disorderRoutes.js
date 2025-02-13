const express = require('express');
const router = express.Router();
const disorderController = require('../controllers/disorderController');

/**
 * @swagger
 * tags:
 *   name: Disorders
 *   description: API for managing disorders
 */

/**
 * @swagger
 * /disorders:
 *   get:
 *     summary: Get all disorders
 *     tags: [Disorders]
 *     responses:
 *       200:
 *         description: List of disorders
 */
router.get('/', disorderController.getAllDisorders);

/**
 * @swagger
 * /disorders/{id}:
 *   get:
 *     summary: Get a disorder by ID
 *     tags: [Disorders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The disorder ID
 *     responses:
 *       200:
 *         description: Disorder details
 *       404:
 *         description: Disorder not found
 */
router.get('/:id', disorderController.getDisorderById);

/**
 * @swagger
 * /disorders:
 *   post:
 *     summary: Create a new disorder
 *     tags: [Disorders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               disorder_name:
 *                 type: string
 *               description:
 *                 type: string
 *               treatment_plan:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     plan_name:
 *                       type: string
 *                     medications:
 *                       type: array
 *                       items:
 *                         type: string
 *     responses:
 *       201:
 *         description: Disorder created successfully
 */
router.post('/', disorderController.createDisorder);

/**
 * @swagger
 * /disorders/{id}:
 *   put:
 *     summary: Update a disorder
 *     tags: [Disorders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               disorder_name:
 *                 type: string
 *               description:
 *                 type: string
 *               treatment_plan:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     plan_name:
 *                       type: string
 *                     medications:
 *                       type: array
 *                       items:
 *                         type: string
 *     responses:
 *       200:
 *         description: Disorder updated successfully
 */
router.put('/:id', disorderController.updateDisorder);

/**
 * @swagger
 * /disorders/{id}:
 *   delete:
 *     summary: Delete a disorder
 *     tags: [Disorders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Disorder deleted successfully
 */
router.delete('/:id', disorderController.deleteDisorder);

module.exports = router;
