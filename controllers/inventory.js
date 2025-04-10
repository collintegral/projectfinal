const mongodb = require('../data/database');

let inventoryController = {};

inventoryController.readAll = async (req, res) => {
    try {
        let result = await mongodb.getDatabase()
        .db()
        .collection('inventory')
        .find()
        .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch(err) {
        res.status(404).json({ message: err });
        return;
    }
}

inventoryController.readOne = async (req, res) => {
    const inventoryName = req.params.name;

    try {
        let result = await mongodb.getDatabase()
        .db()
        .collection('inventory')
        .find({name: inventoryName})
        .toArray();
        if (result.length === 0 | !result) {
            res.status(404).json('An error occurred while retrieving from the database. Perhaps try a different name?');
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch(err) {
        res.status(404).json({ message: err });
        return;
    }
}

inventoryController.createOne = async (req, res) => {
    const inventory = {
        name: req.body.name,
        owner: req.body.owner,
        description: req.body.description,
        value: req.body.value
    }

    try {
        let result = await mongodb.getDatabase().db().collection('inventory').insertOne(inventory);

        if(result.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json('An error occurred while creating the inventory item.')
        }
    } catch(err) {
        res.status(404).json({ message: err });
        return;
    }
}

inventoryController.updateOne = async (req, res) => {
    const inventoryName = req.params.name;
    
    const inventory = {
        name: req.body.name,
        owner: req.body.owner,
        description: req.body.description,
        value: req.body.value
    }

    try {
        let result = await mongodb.getDatabase().db().collection('inventory').replaceOne({name: inventoryName}, inventory);

        if(result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json('An error occurred while updating the inventory item.')
        }
    } catch(err) {
        res.status(404).json({ message: err });
        return;
    }
}

inventoryController.deleteOne = async (req, res) => {
    const inventoryName = req.params.name;

    try {
        let result = await mongodb.getDatabase().db().collection('inventory').deleteOne({name: inventoryName});

        if(result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json('An error occurred while deleting the inventory item.')
        }
    } catch(err) {
        res.status(404).json({ message: err });
        return;
    }
}

module.exports = inventoryController;