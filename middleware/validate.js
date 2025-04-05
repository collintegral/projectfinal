const validator = require('../helper/validate');

let validationRules = {};

validationRules.saveCharacter = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        title: 'string',
        ancestry: 'required|string',
        class: 'required|string',
        level: 'required|int',
        desc: 'required|string',
        author: 'required|string'
    }
    next();
}

validationRules.saveInventory = (req, res, next) => {
    const validationRule = {
        
    }
}

validationRules.saveNote = (req, res, next) => {
    const validationRule = {
        
    }
}

validationRules.savePlayer = (req, res, next) => {
    const validationRule = {
        
    }
}


module.exports = validationRules;