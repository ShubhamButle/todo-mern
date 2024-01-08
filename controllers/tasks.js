import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';

export const geAllTasks = async (req, res, next) => {
  const { search } = req.query;

  let tasks;

  tasks = await User.findById(req.user.userId, { tasks: 1, _id: 0 })
    .sort({ 'tasks.dueDate': -1 })
    .exec();

  if (search) {
    tasks.tasks = tasks.tasks.filter((task) =>
      task.taskName.toLowerCase().includes(search.toLowerCase())
    );
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Data retrieved successfully', tasks });
};

export const addNewTasks = async (req, res) => {
  console.log(req.body);
  const userId = req.user.userId;
  const task = await User.updateOne(
    { _id: userId },
    { $push: { tasks: req.body } }
  );
  res.status(StatusCodes.CREATED).json({ msg: 'new Task Added Successfully' });
};

export const getTaskById = async (req, res) => {
  const taskId = req.params.id;
  const task = await User.find({ 'tasks._id': taskId }, { 'tasks.$': 1 });
  res.status(StatusCodes.OK).json(task);
};
export const updateTask = async (req, res) => {
  console.log(req.body);

  const taskId = req.params.id;
  const userId = req.user.userId;

  const job = await User.updateOne(
    { _id: userId, 'tasks._id': taskId },
    { $set: { 'tasks.$': req.body } }
  );

  res.status(StatusCodes.OK).json({ msg: 'Task Updated Successfully', job });
};
export const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const removedTask = await User.updateOne(
    { _id: req.user.userId },
    { $pull: { tasks: { _id: taskId } } }
  );
  res.status(StatusCodes.OK).json({ msg: 'task deleted successfully' });
};
