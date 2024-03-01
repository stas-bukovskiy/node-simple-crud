const express = require('express');
const { check } = require('express-validator');
const ItemController = require('../controller/item');

const router = express.Router();

router.get('/', ItemController.getAll);

router.get('/:id', ItemController.getById);
router.get('/category/:category', ItemController.getAllByCategory);
router.get('/search/:search', ItemController.getBySearch);

router.post('/', [
    check('name').notEmpty(),
    check('cellId').notEmpty(),
    check('quantity').isInt().if((value, {req}) => req.body.quantity > 0),
    check('price').isInt().if((value, {req}) => req.body.price > 0),
], ItemController.create);

router.put('/:id', [
    check('name').notEmpty(),
    check('cellId').notEmpty(),
    check('quantity').isInt({ min: 1 }),
    check('price').isInt({ min: 1 }),
], ItemController.update);

router.delete('/:id', ItemController.delete);

module.exports = router;