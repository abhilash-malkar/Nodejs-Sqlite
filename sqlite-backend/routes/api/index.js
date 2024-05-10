const express = require('express')
const router = express.Router()

const userRoutes = require('./getusers');
const createDatabase = require('./createDatabase');

router.use('/getusers', userRoutes);
router.use('/create-database', createDatabase);

module.exports = router;