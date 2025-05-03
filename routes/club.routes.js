const { Router } = require("express")
const { createClub, getClubs, oneClub, updateClub, deleteClub } = require("../controllers/club.controller.js")
const upload = require("../middlewares/upload.js")
const clubRouter = Router()

/////////////// swagger

/**
 * @swagger
 * tags:
 *   name: Club
 *   description: Club management API
 */

/**
 * @swagger
 * /add_club:
 *   post:
 *     summary: Create a new club
 *     tags: [Club]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Club name (max 170 characters, unique)
 *                 example: "Real Madrid"
 *               league:
 *                 type: string
 *                 description: League ID (ObjectId)
 *                 example: "60d5f3b2c4b3e12f5c8d4e2a"
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Club logo image file
 *             required:
 *               - title
 *               - league
 *               - logo
 *     responses:
 *       201:
 *         description: Club created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Yangi club qo'shildi"
 *                 data:
 *                   $ref: '#/components/schemas/Club'
 *       400:
 *         description: Bad request (e.g., missing fields or club already exists)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /clubs:
 *   get:
 *     summary: Get a list of all clubs
 *     tags: [Club]
 *     responses:
 *       200:
 *         description: A list of clubs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Club'
 *       404:
 *         description: No clubs found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /one_club/{id}:
 *   get:
 *     summary: Get a single club by ID
 *     tags: [Club]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the club (ObjectId)
 *         schema:
 *           type: string
 *           example: "60d5f3b2c4b3e12f5c8d4e2a"
 *     responses:
 *       200:
 *         description: A single club
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Club'
 *       404:
 *         description: Club not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /update_club/{id}:
 *   put:
 *     summary: Update a club
 *     tags: [Club]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the club (ObjectId)
 *         schema:
 *           type: string
 *           example: "60d5f3b2c4b3e12f5c8d4e2a"
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated club name (max 170 characters, unique, optional)
 *                 example: "Updated Real Madrid"
 *               league:
 *                 type: string
 *                 description: Updated league ID (ObjectId, optional)
 *                 example: "60d5f3b2c4b3e12f5c8d4e2b"
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Updated club logo image file (optional)
 *     responses:
 *       200:
 *         description: Club updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Club yangilandi!"
 *                 data:
 *                   $ref: '#/components/schemas/Club'
 *       400:
 *         description: Bad request (e.g., club name already exists)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Club not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /delete_club/{id}:
 *   delete:
 *     summary: Delete a club by ID
 *     tags: [Club]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the club to be deleted (ObjectId)
 *         schema:
 *           type: string
 *           example: "60d5f3b2c4b3e12f5c8d4e2a"
 *     responses:
 *       200:
 *         description: Club deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Club o'chirildi!"
 *       404:
 *         description: Club not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Club:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Club unique ID (ObjectId)
 *           example: "60d5f3b2c4b3e12f5c8d4e2a"
 *         title:
 *           type: string
 *           description: Club name (max 170 characters, unique)
 *           example: "Real Madrid"
 *         league:
 *           type: object
 *           description: League details (populated)
 *           properties:
 *             _id:
 *               type: string
 *               description: League ID
 *               example: "60d5f3b2c4b3e12f5c8d4e2b"
 *             name:
 *               type: string
 *               description: League name (assumed)
 *               example: "La Liga"
 *         logo:
 *           type: string
 *           description: Club logo URL
 *           example: "https://example.com/uploads/logo.png"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Club creation date
 *           example: "2025-05-04T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Club last updated date
 *           example: "2025-05-04T12:00:00Z"
 *       required:
 *         - _id
 *         - title
 *         - league
 *         - logo
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *           example: "Noto'g'ri so'rov yoki server xatosi"
 *         error:
 *           type: string
 *           description: Error details (optional)
 *           example: "Validation error"
 *       required:
 *         - message
 */


clubRouter.post("/add_club",upload.single('logo'), createClub)

clubRouter.get("/clubs", getClubs)

clubRouter.get("/one_club/:id", oneClub)

clubRouter.put("/update_club/:id",upload.single('logo'), updateClub)

clubRouter.delete("/delete_club/:id", deleteClub)


module.exports = clubRouter