import { Router } from 'express'
import { body, oneOf } from 'express-validator';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';
import { createUpdatePoint, deleteUpdatePoint, getOneUpdatePoint, getUpdatePoints, updateUpdatePoint } from "./handlers/updatepoints";
import { handleInputErrors } from './modules/middleware';

const router = Router();

// get all products for user
router.get('/product', getProducts, (req, res) => {});

// get one product
router.get('/product/:id', getOneProduct, () => {});

// update product
router.put('/product/:id', body("name").isString(), handleInputErrors, updateProduct, (req, res) => {});

// create product
router.post('/product', body("name").isString(), handleInputErrors, createProduct, (req, res) => {});

// delete product
router.delete('/product/:id', deleteProduct, () => {});


// get all updates for a user
router.get('/update', getUpdates, () => {});

// get one update
router.get('/update/:id', getOneUpdate, () => {});

// update an update
router.put('/update/:id', 
    body("title").optional(), 
    body("body").optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(), 
    body("version").optional(), 
    handleInputErrors,
    updateUpdate, 
    () => {});

// create an update
router.post('/update',  
    body("title").exists().isString(), 
    body("body").exists().isString(),
    body("productId").exists().isString(),
    handleInputErrors, 
    createUpdate,
    () => {});

// delete an update
router.delete('/update/:id', deleteUpdate, () => {});

// update point routes
router.get('/updatepoint', getUpdatePoints, () => {});
router.get('/updatepoint/:id', getOneUpdatePoint, () => {});
router.put('/updatepoint/:id', 
    body("name").optional().isString(),
    body("description").optional().isString(),
    updateUpdatePoint,
    handleInputErrors, 
    () => {});

router.post('/updatepoint',     
    body("name").optional().isString(),
    body("description").optional().isString(),
    body("updateId").exists().isString(),
    handleInputErrors, 
    createUpdatePoint,
    () => {});

router.delete('/updatepoint/:id', deleteUpdatePoint, () => {});

export default router;