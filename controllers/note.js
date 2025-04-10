const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../data/database');

let noteController = {};

noteController.readAll = async (req, res) => {
    try {
        let result = await mongodb.getDatabase()
        .db()
        .collection('notes')
        .find()
        .toArray();
        res.setHeader('Content-Tpe', 'application/json');
        res.status(200).json(result);
    } catch(err) {
        res.status(404).json({ message: err });
        return;
    }
}

noteController.readPast = async (req, res) => {
    try {
        let result = await mongodb.getDatabase()
        .db()
        .collection('notes')
        .find({past: true})
        .toArray();
        res.setHeader('Content-Tpe', 'application/json');
        res.status(200).json(result);
    } catch(err) {
        res.status(404).json({ message: err });
        return;
    }
}

noteController.readPlan = async (req, res) => {
    try {
        let result = await mongodb.getDatabase()
        .db()
        .collection('notes')
        .find({past: false})
        .toArray();
        res.setHeader('Content-Tpe', 'application/json');
        res.status(200).json(result);
    } catch(err) {
        res.status(404).json({ message: err });
        return;
    }
}

noteController.createOne = async (req, res) => {
    const note = {
        name: req.body.name,
        author: "GM",
        content: req.body.content,
        past: req.body.past
    }

    try {
        let result = await mongodb.getDatabase()
        .db()
        .collection('notes')
        .insertOne(note);

        if(result.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json('An error occurred while creating the note.')
        }
    } catch(err) {
        res.status(404).json({ message: err });
        return;
    }
}

noteController.updateOne = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid document ID to update a note.');
    }
    const noteId = new ObjectId(req.params.id);

    const note = {
        name: req.body.name,
        author: "GM",
        content: req.body.content,
        past: req.body.past
    }

    try {
        let result = await mongodb.getDatabase()
        .db()
        .collection('notes')
        .replaceOne({_id: noteId}, note);

        if(result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json('An error occurred while updating the note.')
        }
    } catch(err) {
        res.status(404).json({ message: err });
        return;
    }
}

noteController.updateOnePast = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid document ID to update a note.');
    }
    const noteId = new ObjectId(req.params.id);

    try {
        let result = await mongodb.getDatabase()
        .db()
        .collection('notes')
        .updateOne({_id: noteId}, {$set: {past: req.body.past}});

        if(result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json('An error occurred while updating the note.')
        }
    } catch(err) {
        res.status(404).json({ message: err });
        return;
    }
}

noteController.deleteOne = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid document ID to update a note.');
    }
    const noteId = new ObjectId(req.params.id);

    try { 
        let result = await mongodb.getDatabase()
        .db()
        .collection('notes')
        .deleteOne({_id: noteId});

        if(result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json('An error occurred while deleting the character.')
        }
    } catch(err) {
        res.status(404).json({ message: err });
        return;
    }
}

module.exports = noteController;