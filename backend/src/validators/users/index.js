const loginSchema = require('./loginSchema');
const registerSchema = require('./registerSchema'); 
const updateUserSchema = require('./updateUserSchema'); 
const idParamSchema = require('../shared/idParamSchema');
const usersPaginationSchema = require('./usersPaginationSchema');

module.exports = {
    loginSchema,
    registerSchema,
    updateUserSchema,
    idParamSchema,
    usersPaginationSchema
};
