'use strict';

const mysqlPool = require('../../../databases/mysql-pool');

async function activate(req, res) {
  const { verification_code: verificationCode } = req.query;

  if (!verificationCode) {
    return res.status(400).json({
      message: 'Invalid verification code',
      target: 'verification_code',
    });
  }

  const now = new Date();
  const verifiedAt = now
    .toISOString()
    .substring(0, 19)
    .replace('T', ' ');
  const sqlActivateQuery = `UPDATE users_activation SET verified_at = '${verifiedAt}' WHERE verification_code = '${verificationCode}' AND verified_at IS NULL`;

  try {
    const connection = await mysqlPool.getConnection();
    const result = await connection.query(sqlActivateQuery);

    if (result[0].affectedRows === 1) {
      const sqlActivateUserQuery = `UPDATE users u JOIN users_activation ua ON u.uuid = ua.user_uuid AND u.activated_at IS NULL AND ua.verification_code = '${verificationCode}' SET u.activated_at = ua.verified_at`;
      const resultActivateUser = await connection.query(sqlActivateUserQuery);

      if (resultActivateUser[0].affectedRows === 1) {
        connection.release();
        return res.send('account activated');
      }
    }
    connection.release();
    return res.send('verification code invalid');
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

module.exports = activate;
