const formRoute = require('express').Router();
const { logger } = require('../../../lib');

const service = require('../../../services/form-service');
const verifyToken = require('../../../lib/authMiddleware');

/**
 * @swagger
 * /api/v1/form:
 *  post:
 *    description: Create Form
 *    tags:
 *      - Form Builder
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: body
 *        name: body
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            status:
 *              type: string
 *            action:
 *              type: string
 *            method:
 *              type: string
 *            isEncrypt:
 *              type: boolean
 *            fields:
 *              type: array
 *              items:
 *                  $ref: '#/definitions/FiledModel'
 *    responses:
 *      '200':
 *        description: Success Login
 *      '400':
 *        description: Bad Request
 * definitions:
 *  FiledModel:
 *      type: object
 *      properties:
 *          type:
 *              type: string
 *          name:
 *              type: string
 *          id:
 *              type: string
 *          value:
 *              type: string
 *          size:
 *              type: string
 *          maxlength:
 *              type: string
 *          min:
 *              type: string
 *          max:
 *              type: string
 *          pattern:
 *              type: string
 *          required:
 *              type: boolean
 *          step:
 *              type: string
 *          width:
 *              type: string
 *          height:
 *              type: string
 *          list:
 *              type: string
 *          label:
 *              type: string
 *          placeholder:
 *              type: string
 *          method:
 *              type: string
 *          options:
 *              type: string
 *          isMulti:
 *              type: boolean
 */
formRoute.post('/', verifyToken, async (req, res) => {
  logger.info('req:', req);
  const {
    name, status, action, method, isEncrypt, fields,
  } = req.body;

  let form;

  try {
    form = await service.create(name, status, action, method, isEncrypt, fields);
  } catch (e) {
    logger.error('error:', 'Form creating failed - ', e);
    return res.status(400).json({ error: 'Create Form failed' });
  }
  logger.info('res:', 'Create Form successfully');
  return res.status(201).json(form);
});

/**
 * @swagger
 * /api/v1/form/{id}:
 *  put:
 *    description: Update Form
 *    tags:
 *      - Form Builder
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do cliente
 *        required: true
 *        type: string
 *      - in: body
 *        name: body
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            status:
 *              type: string
 *            action:
 *              type: string
 *            method:
 *              type: string
 *            isEncrypt:
 *              type: boolean
 *            fields:
 *              type: array
 *              items:
 *                  $ref: '#/definitions/FiledModel'
 *    responses:
 *      '204':
 *        description: Success Login
 *      '400':
 *        description: Bad Request
 * definitions:
 *  FiledModel:
 *      type: object
 *      properties:
 *          type:
 *              type: string
 *          name:
 *              type: string
 *          id:
 *              type: string
 *          value:
 *              type: string
 *          size:
 *              type: string
 *          maxlength:
 *              type: string
 *          min:
 *              type: string
 *          max:
 *              type: string
 *          pattern:
 *              type: string
 *          required:
 *              type: boolean
 *          step:
 *              type: string
 *          width:
 *              type: string
 *          height:
 *              type: string
 *          list:
 *              type: string
 *          label:
 *              type: string
 *          placeholder:
 *              type: string
 *          method:
 *              type: string
 *          options:
 *              type: string
 *          isMulti:
 *              type: boolean
 */
formRoute.put('/:id', verifyToken, async (req, res) => {
  logger.info('req:', req);
  const {
    status, action, method, isEncrypt, fields,
  } = req.body;
  const { id } = req.params;

  try {
    await service.find(id);
    await service.update(id, status, action, method, isEncrypt, fields);
  } catch (e) {
    logger.error('error:', 'Form update failed - ', e);
    return res.status(400).json({ error: 'Update Form failed' });
  }
  logger.info('res:', 'Update Form successfully');
  return res.status(204).json();
});

/**
 * @swagger
 * /api/v1/form/{id}:
 *  delete:
 *    description: Delete Form & Data
 *    tags:
 *      - Form Builder
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do cliente
 *        required: true
 *        type: string
 *    responses:
 *      '204':
 *        description: Success Create User
 */
formRoute.delete('/:id', verifyToken, async (req, res) => {
  logger.info('req:', req);
  const { id } = req.params;

  try {
    await service.find(id);
    await service.removeData(id);
    await service.remove(id);
  } catch (e) {
    logger.error('error:', 'Form Delete failed - ', e);
    res.status(400).json({ error: 'Delete Form failed' });
  }
  logger.info('res:', 'Delete Form successfully');
  return res.status(204).json();
});

/**
 * @swagger
 * /api/v1/form/all:
 *  get:
 *    description: Get Forms
 *    tags:
 *      - Form Builder
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: start
 *        in: path
 *        type: number
 *      - name: size
 *        in: path
 *        type: number
 *    responses:
 *      '200':
 *        description: Inquiry forms
 */
formRoute.get('/all', async (req, res) => {
  logger.info('req:', req);
  const { start, size } = req.query;

  let forms;

  try {
    forms = await service.inquiry(start, size);
  } catch (e) {
    logger.error('error:', 'Fetch forms failed - ', e);
    return res.status(500).json({ error: 'Fetch form failed' });
  }
  logger.info('res:', 'Fetch forms successfully');
  return res.status(200).json(forms);
});

/**
 * @swagger
 * /api/v1/form/{id}:
 *  get:
 *    description: Get Form By ID
 *    tags:
 *      - Form Builder
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do cliente
 *        required: true
 *        type: string
 *    responses:
 *      '204':
 *        description: Success Create User
 */
formRoute.get('/:id', verifyToken, async (req, res) => {
  logger.info('req:', req);
  const { id } = req.params;

  let forms;

  try {
    forms = await service.find(id);
  } catch (e) {
    logger.error('error:', 'Get Form failed - ', e);
    res.status(400).json({ error: 'Get Form failed' });
  }
  logger.info('res:', 'GET Form successfully');
  return res.status(200).json(forms);
});

/**
 * @swagger
 * /api/v1/form/save:
 *  post:
 *    description: Save Form
 *    tags:
 *      - Form Builder
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: body
 *        name: body
 *        schema:
 *          type: object
 *          properties:
 *            formId:
 *               type: string
 *            data:
 *               type: object
 *    responses:
 *      '200':
 *        description: Success Create User
 */
formRoute.post('/save', async (req, res) => {
  logger.info('req:', req);
  const { formId, data } = req.body;
  try {
    await service.createData(formId, data);
  } catch (e) {
    logger.error('error:', 'Save form failed - ', e);
    return res.status(500).json({ error: 'Save form failed' });
  }
  logger.info('res:', 'Save form successfully');
  return res.status(201).json({ message: 'Save form successfully' });
});

module.exports = formRoute;
