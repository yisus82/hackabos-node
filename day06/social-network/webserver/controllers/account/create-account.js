'use strict';

const Joi = require('joi');

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
  }

  const { email, password, fullName } = accountData;

  try {
    /**
     * TODO: Insert user into MySQL
     *  hash the password using bcrypt library
     */
    const securePassword = 'TODO'; /* USE BCRYPT TO CIPHER THE PASSWORD */

    /**
     * TODO: Insert user into mysql and get the user uuid
     */

    /**
     * TODO: CREATE VERIFICATION CODE AND INSERT IT INTO MySQL
     */
    const verificationCode =      'TODO: use uuid library to generate a uuid version 4';

    /**
     * TODO: Tell user the account was created
     */
    res.status(204).json();

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
