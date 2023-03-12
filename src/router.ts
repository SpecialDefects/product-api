import { Router } from 'express'
import { body } from 'express-validator';
import { handleInputErrors } from './modules/middleware';

const router = Router();

// product routes
router.get('/product', body("name"), (req, res) => {});

router.get('/product/:id', () => {});
router.put('/product/:id', body("name").isString(), handleInputErrors, (req, res) => {
 
});

router.post('/product', body("name"), handleInputErrors, (req, res) => {});
router.delete('/product/:id', () => {});

// update routes
router.get('/update', () => {});
router.get('/update/:id', () => {});
router.put('/update/:id', body("name"), handleInputErrors, () => {});
router.post('/update', body("name"), handleInputErrors, () => {});
router.delete('/update/:id', () => {});

// update point routes
router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put('/updatepoint/:id', body("name"), handleInputErrors, () => {});
router.post('/updatepoint', body("name"), handleInputErrors, () => {});
router.delete('/updatepoint/:id', () => {});

export default router;