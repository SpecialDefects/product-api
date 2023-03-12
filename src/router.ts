import { Router } from 'express'
import { body, oneOf } from 'express-validator';
import { handleInputErrors } from './modules/middleware';

const router = Router();

// product routes
router.get('/product', body("name"), (req, res) => {});

router.get('/product/:id', () => {});
router.put('/product/:id', body("name").isString(), handleInputErrors, (req, res) => {
 
});

router.post('/product', body("name").isString(), handleInputErrors, (req, res) => {});
router.delete('/product/:id', () => {});

// update routes
router.get('/update', () => {});
router.get('/update/:id', () => {});
router.put('/update/:id', 
    body("title").optional(), 
    body("body").optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]), 
    body("version").optional(), 
    handleInputErrors, 
    () => {});

router.post('/update',  
    body("title").exists().isString(), 
    body("body").exists().isString(),
    handleInputErrors, 
    () => {});
router.delete('/update/:id', () => {});

// update point routes
router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put('/updatepoint/:id', 
    body("name").optional().isString(),
    body("description").optional().isString(), 
    handleInputErrors, 
    () => {});

router.post('/updatepoint',     
    body("name").optional().isString(),
    body("description").optional().isString(),
    body("updateId").exists().isString(),
    handleInputErrors, 
    () => {});

router.delete('/updatepoint/:id', () => {});

export default router;