const { getUserByEmail, insertUser } = require('../database/userCredentials');

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    await insertUser(email, password);
    res.status(201).json({ message: 'Registration successful! Please check your email to confirm your account.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during registration', error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (user.length === 0 || user[0].password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', userId: user[0].id });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during login', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};