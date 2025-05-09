const validator = require('../helper/validate');

let validationRules = {};

validationRules.saveCharacter = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        title: 'string',
        ancestry: 'required|string',
        class: 'required|string',
        level: 'required|integer',
        description: 'required|string',
        author: 'required|string'
    }

    validator(req.body, validationRule, {}, (err, status) => {
        if (status) {
            next();
        } else {
            res.status(412).send({
                success: false,
                message: 'Validation failed.',
                data: err
            });
        }
    });
}

validationRules.saveInventory = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        owner: 'string',
        description: 'required|string',
        value: 'integer'
    }

    validator(req.body, validationRule, {}, (err, status) => {
        if (status) {
            next();
        } else {
            res.status(412).send({
                success: false,
                message: 'Validation failed.',
                data: err
            });
        }
    });
}

validationRules.saveNote = (req, res, next) => {
    const validationRule = {
        name: "required|string",
        content: "required|string",
        past: "required|boolean"
    }

    validator(req.body, validationRule, {}, (err, status) => {
        if (status) {
            next();
        } else {
            res.status(412).send({
                success: false,
                message: 'Validation failed.',
                data: err
            });
        }
    });
}

validationRules.savePlayer = (req, res, next) => {
    const validationRule = {
        name: "required|string",
        username: "required|string",
        charname: "string",
        bio: "string"
    }

    validator(req.body, validationRule, {}, (err, status) => {
        if (status) {
            next();
        } else {
            res.status(412).send({
                success: false,
                message: 'Validation failed.',
                data: err
            });
        }
    });
}


module.exports = validationRules;