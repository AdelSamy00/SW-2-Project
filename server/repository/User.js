const conn = require('../config/connection');
const bcrypt = require('bcryptjs');
const BookForUser = require('./BookForUser');

class User {
  constructor(
    id,
    name,
    email,
    password,
    phone,
    status,
    type,
    token,
    limited_requests
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.status = status;
    this.type = type;
    this.token = token;
    this.limited_requests = limited_requests;
  }

  async getUserByEmail(email) {
    try {
      const user = await conn.awaitQuery('select * from users where ?', {
        email: email,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByID(id) {
    try {
      const user = await conn.awaitQuery('select * from users where ?', {
        id: id,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(req, res, token) {
    const data = req.body;
    try {
      const password = data.password[0];
      const hashPassword = await bcrypt.hash(password, 10);
      data.password = hashPassword;
      const result = await conn.awaitQuery(
        'insert into users set ?',
        {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          token: token,
        },
        (err, result) => {
          if (err) {
            res.statusCode = 210;
            res.json({ messege: 'failed to save user' });
          } else {
            res.status(200).json({
              messege:
                'created succsessfully and yo well wait to approve your request',
            });
          }
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async userLogin(email, password) {
    try {
      const userDetails = await this.getUserByEmail(email);
      console.log(password);
      if (userDetails.length > 0) {
        const valid = await bcrypt.compare(password, userDetails[0].password);
        //console.log(valid);
        if (valid) {
          return userDetails;
        } else {
          return [];
        }
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }
}
module.exports = User;
