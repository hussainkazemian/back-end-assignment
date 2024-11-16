import promisePool from '../utils/database.js';

const fetchUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM Users');
  return rows;
};

const fetchUserById = async (id) => {
  const [rows] = await promisePool.query('SELECT * FROM Users WHERE user_id = ?', [id]);
  return rows[0];
};

const addUser = async (user) => {
    const sql = `INSERT INTO Users (username, email, password) VALUES (?, ?, ?)`;
    const params = [user.username, user.email, user.password];
    const [result] = await promisePool.query(sql, params);
    return result.insertId;
  };
  

const updateUser = async (id, user) => {
  const sql = `UPDATE Users SET username = ?, email = ? WHERE user_id = ?`;
  const params = [user.username, user.email, id];
  await promisePool.query(sql, params);
};

const deleteUser = async (id) => {
  const sql = `DELETE FROM Users WHERE user_id = ?`;
  await promisePool.query(sql, [id]);
};
export { fetchUsers, fetchUserById, addUser, updateUser, deleteUser };
