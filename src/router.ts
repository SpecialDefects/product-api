import { Router } from 'express'
import { body, validationResult } from 'express-validator';

const router = Router();

// product routes
router.get('/product', body("name"), (req, res) => {
    const errors = validationResult(req);
     if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
     }
});

router.get('/product/:id', () => {});
router.put('/product/:id', body("name").isString(), (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
    }
});

router.post('/product', body("name"), (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
    }
});
router.delete('/product/:id', () => {});

// update routes
router.get('/update', () => {});
router.get('/update/:id', () => {});
router.put('/update/:id', () => {});
router.post('/update', () => {});
router.delete('/update/:id', () => {});

// update point routes
router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put('/updatepoint/:id', () => {});
router.post('/updatepoint', () => {});
router.delete('/updatepoint/:id', () => {});

export default router;