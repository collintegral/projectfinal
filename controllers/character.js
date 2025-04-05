const mongodb = require('../data/database');

let characterController = {};

characterController.readAll = async (req, res) => {
    try {
        let result = await mongodb.getDatabase()
        .db()
        .collection('characters')
        .find()
        .toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch(err) {
        res.status(404).json({ message: err });
        return;
    }
}

characterController.readOne = async (req, res) => {
    const characterName = req.params.name;

    try {
        let result = await mongodb.getDatabase()
        .db()
        .collection('characters')
        .find({name: characterName})
        .toArray();
        if (!result) {
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

characterController.createOne = async (req, res) => {
    const character = {
        name: req.body.name,
        title: req.body.title,
        ancestry: req.body.ancestry,
        class: req.body.class,
        level: req.body.level,
        desc: req.body.description,
        author: req.body.author
    }

    try {
        let result = await mongodb.getDatabase().db().collection('characters').insertOne(character);

        if(result.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'An error occurred while creating the character.')
        }
    } catch(err) {
        res.status(404).json({ message: err });
        return;
    }
}

characterController.updateOne = async (req, res) => {
    const characterName = req.params.name;
    
    const character = {
        name: req.body.name,
        title: req.body.title,
        ancestry: req.body.ancestry,
        class: req.body.class,
        level: req.body.level,
        desc: req.body.description,
        author: req.body.author
    }

    try {
        let result = await mongodb.getDatabase().db().collection('characters').replaceOne({name: characterName}, character);

        if(result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'An error occurred while creating the character.')
        }
    } catch(err) {
        res.status(404).json({ message: err });
        return;
    }
}

characterController.deleteOne = async (req, res) => {
    const characterName = req.params.name;

    try {
        let result = await mongodb.getDatabase().db().collection('characters').deleteOne({name: characterName});

        if(result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'An error occurred while creating the character.')
        }
    } catch(err) {
        res.status(404).json({ message: err });
        return;
    }
}

module.exports = characterController;