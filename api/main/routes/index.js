const router = require('express').Router();
const clientRoute = require('./v1');
const userRoute = require('./user/v1');
const formRoute = require('./form/v1');

router.use('/healthcheck', clientRoute);
router.use('/user', userRoute);
router.use('/form', formRoute);

module.exports = router;
