import express from 'express'

import authRouter from './auth.route'
import productRouter from './products.route'
import categoryRouter from './categories.route'
import providerRouter from './providers.route'
import userRouter from './users.route'
import saleRouter from './sales.route'
import saleProductRouter from './saleProducts.route'

import isAuthenticate from '../middleware/isAuthenticate'

import {handleGetSale} from '../middleware/sales/handleGetSale'

import {index_permission} from '../middleware/sales/sales.permissions'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/products', isAuthenticate, productRouter)
router.use('/categories', isAuthenticate, categoryRouter)
router.use('/providers', isAuthenticate, providerRouter)
router.use('/users', isAuthenticate, userRouter)
router.use('/sales', isAuthenticate, saleRouter)
router.use('/sales/:pk/saleProducts', isAuthenticate, handleGetSale, index_permission, saleProductRouter)

export default router
