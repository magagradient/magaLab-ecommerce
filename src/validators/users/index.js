const loginSchema = require('./loginSchema');
const registerSchema = require('./registerSchema'); 
const updateUserSchema = require('./updateUserSchema'); 
const idParamSchema = require('../shared/idParamSchema');

module.exports = {
    loginSchema,
    registerSchema,
    updateUserSchema,
    idParamSchema,
};
