const express = require('express');
const router = express.Router();

const userRoutes = require('./user-routes');
const questionRoutes = require('./question-route');

router.use('/user', userRoutes);
router.use('/question', questionRoutes);

module.exports = router;
