const db = require("../db");

const addCustomer = async (req, res) => {
  console.log('customer:addCustomer:', req.body);
  const {
    store_id,
    first_name,
    last_name,
    email,
    phone,
    address,
    address2,
    district,
    city_id,
    postal_code,
  } = req.body;

  try {

    const { rows } = await db.query(`
      WITH addr AS
      (
        INSERT INTO address(address, address2, district, city_id, postal_code, phone) VALUES(
          '${address}', '${address2}', '${district}', ${city_id}, '${postal_code}', '${phone}'
        ) RETURNING address_id
      ),
      cust AS
      (
        INSERT INTO customer(store_id, first_name, last_name, email, address_id, activebool, active)
          SELECT ${store_id}, '${first_name}', '${last_name}', '${email}', address_id, true, 1 FROM addr
        RETURNING customer_id
      )
      SELECT customer_id FROM cust
    `);

    if (rows[0]?.customer_id) {
      res.json({message: `Successfully added customer with id: ${rows[0]?.customer_id}`});
    } else {
      console.log('S201:');
      res.status(418).json({
        code: 'S201',
        message: 'Error adding customer'
      })
    }

  } catch (e) {
    console.log('S202:', e);
    res.status(418).json({
      code: 'S202',
      message: 'Error adding customer'
    })
  }
}

const deleteCustomer = async (req, res) => {
  console.log('customer:deleteCustomer:', req.body);
  const { customer_id } = req.body;

  if (!customer_id) {
    console.log('S203:');
    res.status(418).json({
      code: 'S203',
      message: 'Please send in customer_id to delete'
    })
    return;
  }

  try {
    await db.query(`
      WITH cust AS
      (
        DELETE FROM customer WHERE customer_id = ${customer_id} RETURNING address_id
      )
      DELETE FROM address WHERE address_id = (SELECT address_id FROM cust);
    `)

    res.json({message: `Successfully deleted customer with id: ${customer_id}`});

  } catch (e) {
    console.log('S204:', e);
    res.status(418).json({
      code: 'S204',
      message: 'Error deleting customer'
    })
  }
}

const getStores = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT store_id FROM store');
    res.json(rows);

  } catch (e) {
    console.log('S205:', e);
    res.json([])
  }
}

const getCities = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT city_id, city FROM city');
    res.json(rows);

  } catch (e) {
    console.log('S206:', e);
    res.json([])
  }
}

const getCustomers = async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT customer_id, first_name || ' ' || last_name AS name FROM customer`);
    res.json(rows);

  } catch (e) {
    console.log('S207:', e);
    res.json([])
  }
}

module.exports = {
  addCustomer,
  deleteCustomer,
  getStores,
  getCities,
  getCustomers
}