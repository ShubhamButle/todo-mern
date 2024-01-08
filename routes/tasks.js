import express from 'express';
import {
  geAllTasks,
  addNewTasks,
  getTaskById,
  deleteTask,
  updateTask,
} from '../controllers/tasks.js';
import {
  validateParams,
  validateTaskInput,
} from '../middleware/validationMiddleware.js';
const router = express.Router();

router.route('/').get(geAllTasks).post(validateTaskInput, addNewTasks);

router
  .route('/:id')
  .get(validateParams, getTaskById)
  .patch(validateTaskInput, validateParams, updateTask)
  .delete(validateParams, deleteTask);

// TODO

export default router;
