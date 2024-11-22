const { Router } = require('express');
const { QuestionController } = require('../../controllers');

const router = Router();

router.get('/next', QuestionController.getQuestion);

module.exports = router;
