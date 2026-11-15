const bcrypt = require("bcryptjs");

class User {
  constructor(userID, name, email, password) {
    this.userID = userID;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

const users = [];

async function registerUser(name, email, password) {
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some(user => user.email === normalizedEmail)) {
    throw new Error("Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User(
    users.length + 1,
    name.trim(),
    normalizedEmail,
    hashedPassword
  );

  users.push(user);
  return user;
}

async function loginUser(email, password) {
  const user = users.find(
    user => user.email === email.trim().toLowerCase()
  );

  if (!user) return null;

  const passwordMatches = await bcrypt.compare(
    password,
    user.password
  );

  return passwordMatches ? user : null;
}

function getUserById(id) {
  return users.find(user => user.userID === Number(id));
}

module.exports = {
  registerUser,
  loginUser,
  getUserById
};