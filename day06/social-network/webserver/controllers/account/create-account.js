'use strict';

const Joi = require('joi');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const mysql = require('mysql2/promise');

// create the connection to database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'socialnetwork',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function validateSchema(payload) {
  /**
   * TODO: Fill email, password and full name rules to be (all fields are mandatory):
   *  email: Valid email
   *  password: Letters (upper and lower case) and number
   *    Minimun 3 and max 30 characters, using next regular expression: /^[a-zA-Z0-9]{3,30}$/
   * fullName: String with 3 minimum characters and max 128
   */
  const schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    // fullName: rules.fullName,
  };

  return Joi.validate(payload, schema);
}

async function create(req, res, next) {
  const accountData = { ...req.body };

  /**
   * Validate if user data is valid to create an account
   * in other case, generate a 400 Bad Request error
   */
  try {
    await validateSchema(accountData);
  } catch (e) {
    // Create validation error
    return res.status(400).send(e);
  }

  const { email, password, fullName } = accountData;

  try {
    /**
     * TODO: Insert user into MySQL
     *  hash the password using bcrypt library
     */
    const securePassword = await bcrypt.hash(password, 10);
    const uuid = uuidv4();
    const createdAt = new Date()
      .toISOString()
      .substring(0, 19)
      .replace('T', ' ');

    /**
     * TODO: Insert user into mysql and get the user uuid
     */
    try {
      await pool.query('INSERT INTO users SET ?', {
        uuid,
        email,
        password: securePassword,
        created_at: createdAt,
      });
    } catch (e) {
      return res.status(409).send(e.message);
    }

    /**
     * TODO: Tell user the account was created
     */
    res.status(204).json();

    /**
     * TODO: CREATE VERIFICATION CODE AND INSERT IT INTO MySQL
     */
    const verificationCode = uuidv4();
    try {
      await pool.query('INSERT INTO users_activation SET ?', {
        user_uuid: uuid,
        verification_code: verificationCode,
        created_at: createdAt,
      });
    } catch (e) {
      return res.status(409).send(e.message);
    }

    // send email
    try {
      /**
       * Send email to the user adding the verificationCode in the link
       */
    } catch (e) {
      console.error('Sengrid error', e);
    }
  } catch (e) {
    // create error
    next(e);
  }
}

module.exports = create;
