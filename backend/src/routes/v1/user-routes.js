const { Router } = require('express');
const { AuthMiddlewares } = require('../../middlewares/');
const { UserController } = require('../../controllers');
const bodyParser = require('body-parser');

const router = Router();

router.get('/:userId', UserController.getUser);

router.post('/webhooks', bodyParser.raw({ type: 'application/json' }), UserController.webhooks);

router.post(
  '/webhooks/test',
  bodyParser.raw({ type: 'application/json' }),
  UserController.webhooksTest
);

module.exports = router;
