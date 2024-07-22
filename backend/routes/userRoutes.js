import { createUser, deleteUserById, getAllUsers, getCurrentUserProfile, getUserById, loginUser, logoutUser, updateCurrentUserProfile, updateUserById } from "../controllers/userController.js";
import express from "express";
import {authenticate, authorizeAdmin} from "../middleware/authMiddleware.js"

const router = express.Router();

router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers)
router.post('/auth', loginUser)
router.post('/logout', logoutUser)

router.route('/profile')
.get(authenticate, getCurrentUserProfile)
.put(authenticate, updateCurrentUserProfile)

router.route('/:id')
.delete(authenticate, authorizeAdmin, deleteUserById)
.get(authenticate, authorizeAdmin, getUserById)
.put(authenticate, authorizeAdmin, updateUserById)

export default router;
