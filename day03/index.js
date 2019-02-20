'use strict';

const dns = require('dns');

const options = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};
dns.lookup('example.com', options, (err, address, family) => console.log('address: %j family: IPv%s', address, family));
