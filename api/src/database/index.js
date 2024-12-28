const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'mycontacts',
  database: 'mycontacts',
});

client.connect();

exports.query = async (text, values) => {
  const res = await client.query(text, values);
  return res.rows;
};
