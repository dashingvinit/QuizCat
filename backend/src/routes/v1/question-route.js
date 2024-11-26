const { Router } = require('express');
const { QuestionController } = require('../../controllers');

const router = Router();

router.post('/start', QuestionController.startQuiz);
router.post('/next', QuestionController.getQuestion);
router.post('/submit', QuestionController.submitAnswer);
router.get('/report/:quizId', QuestionController.generateReport);

router.get('/history/:id', QuestionController.getHistory);
router.get('/history/detail/:id', QuestionController.getDetail);

module.exports = router;
