const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../data/database');

let playerController = {};

playerController.readAll = async (req, res) => {
    try {
            let result = await mongodb.getDatabase()
            .db()
            .collection('players')
            .find()
            .toArray();
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } catch(err) {
            res.status(404).json({ message: err });
            return;
        }
}

playerController.readOne = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid document ID to see a player.');
    }
    const playerId = new ObjectId(req.params.id);
    
    try {
            let result = await mongodb.getDatabase()
            .db()
            .collection('players')
            .find({_id: playerId})
            .toArray();
            if (result.length === 0 | !result) {
                res.status(404).json('An error occurred while retrieving from the database. Perhaps try a different id?');
                return;
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        } catch(err) {
            res.status(404).json({ message: err });
            return;
        }
}

playerController.createOne = async (req, res) => {
    const player = {
        name: req.body.name,
        username: req.body.username,
        charname: req.body.charname,
        bio: req.body.bio
    }

    try {
        let result = await mongodb.getDatabase()
        .db()
        .collection('players')
        .insertOne(player);

        if(result.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json('An error occurred while creating the player.')
        }
    } catch(err) {
        res.status(404).json({ message: err });
        return;
    }
}

playerController.updateOne = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid document ID to update a player.');
    }
    const playerId = new ObjectId(req.params.id);

    const player = {
        name: req.body.name,
        username: req.body.username,
        charname: req.body.charname,
        bio: req.body.bio
    }

    try {
        let result = await mongodb.getDatabase()
        .db()
        .collection('players')
        .replaceOne({_id: playerId}, player);

        if(result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json('An error occurred while updating the player.')
        }
    } catch(err) {
        res.status(404).json({ message: err });
        return;
    }
}

playerController.deleteOne = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid document ID to delete a player.');
    }
    const playerId = new ObjectId(req.params.id);

    try {
        let result = await mongodb.getDatabase()
        .db()
        .collection('players')
        .deleteOne({_id: playerId});

        if(result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json('An error occurred while updating the player.')
        }
    } catch(err) {
        res.status(404).json({ message: err });
        return;
    }
}

module.exports = playerController;