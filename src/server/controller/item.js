const ItemService = require('../services/item');
const {validationResult} = require('express-validator');
const {ItemNotFoundError, CellAlreadyTakenError} = require('../model/errors');

class ItemController {
    static async getAll(req, res) {
        try {
            const items = await ItemService.getAll();
            res.json(items);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    static async getById(req, res) {
        const {id} = req.params;

        try {
            const item = await ItemService.getById(id);
            res.json(item);
        } catch (error) {
            if (error instanceof ItemNotFoundError) {
                return res.status(404).json({error: 'Item with given ID not found'});
            }

            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    static async getAllByCategory(req, res) {
        const {category} = req.params;

        try {
            const items = await ItemService.getAllByCategory(category);
            res.json(items);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    static async getBySearch(req, res) {
        const {search} = req.params;

        try {
            const items = await ItemService.search(search);
            res.json(items);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    static async create(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        try {
            const itemData = req.body;
            const newItem = await ItemService.create(itemData);
            res.status(201).json(newItem);
        } catch (error) {
            if (error instanceof CellAlreadyTakenError) {
                return res.status(409).json({error: 'Cell already taken'});
            }

            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    static async update(req, res) {
        const {id} = req.params;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const itemData = req.body;
            const updatedItem = await ItemService.update(id, itemData);
            res.json(updatedItem);
        } catch (error) {
            if (error instanceof ItemNotFoundError) {
                return res.status(404).json({error: 'Item with given ID not found'});
            }
            if (error instanceof CellAlreadyTakenError) {
                return res.status(409).json({error: 'Cell already taken'});
            }

            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    static async delete(req, res) {
        try {
            const {id} = req.params;
            const deletedItem = await ItemService.delete(id);
            res.json(deletedItem);
        } catch (error) {
            if (error instanceof ItemNotFoundError) {
                return res.status(404).json({error: 'Item with given ID not found'});
            }

            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
}

module.exports = ItemController;