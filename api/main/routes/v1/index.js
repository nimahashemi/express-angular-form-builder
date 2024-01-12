const clientRoute = require('express').Router();
const { logger } = require('../../lib');

const service = require('../../services/client-service');

/**
 * @swagger
 * /api/v1/healthcheck:
 *  get:
 *    description: Service Health Check
 *    responses:
 *      '200':
 *        description: Success -> GREEN | Failed -> RED | In-Progress -> YELLOW. ORANG
 *      '500':
 *        description: Server Error, DB down or wating for connection
 */
clientRoute.get('/', async (req, res) => {
  const result = await service.healthCheck();
  logger.info(`Calling health check service, service status: ${result}`);

  res.status(200).json({ status: result });
});

module.exports = clientRoute;
