import { updateUserById, selectUserById } from '../models/user-model.js';

const putUser = async (req, res) => {
  const { username, email } = req.body;
  try {
    const updatedUser = await updateUserById(req.user.user_id, { username, email });
    if (updatedUser === 0) {
      return res.status(403).json({ message: 'Cannot update user information.' });
    }
    return res.status(200).json({ message: 'User information updated' });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong: ' + error.message });
  }
};

const getUserById = async (req, res) => {
  const id = parseInt(req.params.id, 10); // Parse the user_id from request params
  try {
    const user = await selectUserById(id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('getUserById', error.message);
    return res.status(500).json({ message: 'Something went wrong: ' + error.message });
  }
};

export { getUserById, putUser };
