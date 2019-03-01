'use strict';

const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mysqlPool = require('../../../databases/mysql-pool');

async function validateSchema(payload) {
  const schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
  };

  return Joi.validate(payload, schema);
}

async function login(req, res) {
  const accountData = { ...req.body };

  try {
    await validateSchema(accountData);
  } catch (e) {
    return res.status(400).send(e);
  }

  try {
    const connection = await mysqlPool.getConnection();
    const sqlQuery = `SELECT email, password, uuid, activated_at FROM users WHERE email = '${
      accountData.email
    }'`;
    const [result] = await connection.query(sqlQuery);
    connection.release();
    if (result.length === 1) {
      const userData = result[0];
      if (!userData.activated_at) {
        return res.status(403).send();
      }
      if (!(await bcrypt.compare(accountData.password, userData.password))) {
        return res.status(401).send();
      }
      const payloadJWT = {
        uuid: userData.uuid,
        role: 'admin',
      };
      const token = jwt.sign(payloadJWT, process.env.AUTH_JW_SECRET, {
        expiresIn: 60,
      });
      const response = {
        accessToken: token,
        expiresIn: 60,
      };
      return res.status(200).send(response);
    }
    return res.status(404).send();
  } catch (e) {
    console.error(e);
    return res.status(500).send(e.message);
  }
}

module.exports = login;
