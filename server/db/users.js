const connection = require('./connection')
const hash = require('../auth/hash')

module.exports = {
  createUser,
  userExists,
  getUserById,
  getUserByName,
  updateUser
}

function createUser (username, password, db = connection) {
  return userExists(username, db)
    .then(exists => {
      if (exists) {
        return Promise.reject(new Error('User exists'))
      }
    })
    .then(() => hash.generate(password))
    .then(passwordHash => {
      return db('users').insert({ username, hash: passwordHash })
    })
}

function userExists (username, db = connection) {
  return db('users')
    .count('id as n')
    .where('username', username)
    .then(count => {
      return count[0].n > 0
    })
}

function getUserById (id, db = connection) {
  return db('users')
    .select('id', 'username')
    .where('id', id)
    .first()
}

function getUserByName (username, db = connection) {
  return db('users')
    .select()
    .where('username', username)
    .first()
}

function updateUser (id, username, currentPassword, newPassword, db = connection) {
  return getUserByName(username, db)
    .then(user => {
      if (!user || !hash.verify(user.hash, currentPassword)) {
        return Promise.reject(new Error('Username password match not found'))
      }
      return Promise.resolve(user)
    })
    .then(user => {
      const newPasswordHash = hash.generate(newPassword)
      if (id !== user.id) Promise.reject(new Error('Username and ID mismatch'))
      return db('users')
        .update({ username, hash: newPasswordHash })
        .where('id', user.id)
    })
}
