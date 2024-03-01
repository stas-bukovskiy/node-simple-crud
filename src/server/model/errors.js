class CellAlreadyTakenError extends Error {
    constructor(message) {
        super(message);
        this.name = "CellAlreadyTakenError";
    }
}

class ItemNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "ItemNotFoundError";
    }
}

module.exports = {
    CellAlreadyTakenError,
    ItemNotFoundError
}