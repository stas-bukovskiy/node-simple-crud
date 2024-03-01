const ItemDAO = require('../model/item');
const {ItemNotFoundError, CellAlreadyTakenError} = require('../model/errors');
const {isValidObjectId} = require("mongoose");

class ItemService {
    static async getAll() {
        return ItemDAO.find();
    }

    static async getAllByCategory(category) {
        return ItemDAO.find({category: category});
    }

    static async getById(id) {
        if (!isValidObjectId(id)) {
            throw new ItemNotFoundError();
        }

        const exists = await ItemDAO.exists({_id: id});
        if (!exists) {
            throw new ItemNotFoundError();
        }

        return ItemDAO.findById(id);
    }

    static async search(searchQuery) {
        searchQuery = `${searchQuery}`
        return ItemDAO.find({
            $or: [{name: {$regex: searchQuery, $options: 'i'}}, {
                description: {
                    $regex: searchQuery,
                    $options: 'i'
                }
            }, {category: {$regex: searchQuery, $options: 'i'}}]
        });
    }

    static async create(itemData) {
        const isCellIdTaken = await ItemDAO.exists({cellId: itemData.cellId});
        if (isCellIdTaken) {
            throw new CellAlreadyTakenError();
        }

        const item = new ItemDAO({...itemData});
        await item.save();
        return item;
    }

    static async update(id, itemData) {
        if (!isValidObjectId(id)) {
            throw new ItemNotFoundError();
        }

        const itemToUpdate = await ItemDAO.findById(id)
        if (!itemToUpdate) {
            throw new ItemNotFoundError();
        }
        if (itemToUpdate.cellId !== itemData.cellId) {
            const isCellIdTaken = await ItemDAO.exists({cellId: itemData.cellId});
            if (isCellIdTaken) {
                throw new CellAlreadyTakenError();
            }
        }

        return ItemDAO.findByIdAndUpdate(id, itemData);
    }

    static async delete(id) {
        if (!isValidObjectId(id)) {
            throw new ItemNotFoundError();
        }

        const exists = await ItemDAO.exists({_id: id});
        if (!exists) {
            throw new ItemNotFoundError();
        }
        return ItemDAO.findByIdAndDelete(id);
    }
}

module.exports = ItemService;