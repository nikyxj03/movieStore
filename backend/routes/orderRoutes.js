import express from "express";
const router = express.Router()

import{
    createOrder,
    findOrderById
} from '../controllers/orderController.js'


import {authenticate, authorizeAdmin} from '../middleware/authMiddleware.js'


router
    .route('/')
    .post(authenticate,createOrder)

router.route("/:id").get(authenticate, findOrderById);



export default router    
 
