const db = require("../db");

const getFilmsByCategory = async (req, res) => {
  console.log('films:getFilmsByCategory:', req.query);
  const { category_name } = req.query;

  if (!category_name) {
    console.log('S101:');
    res.status(418).json({
      code: 'S101',
      message: 'Please send in a category to filter'
    })
    return;
  }

  try {
    // const { rows } = await db.query(`SELECT film_id, title, description, rental_rate FROM film WHERE film_id IN (
    //   SELECT film_id from film_category WHERE category_id=(
    //     SELECT category_id FROM category WHERE name = $1
    //   )
    // )`, [category_name]);

    const { rows } = await db.query(`SELECT film_id, title, description, rental_rate FROM film WHERE film_id IN (
      SELECT film_id from film_category WHERE category_id = $1
    )`, [category_name]);

    res.json(rows);

  } catch (e) {
    console.log('S102:', e);
    res.status(418).json({
      code: 'S102',
      message: 'Error fetching films by category'
    })
  }
}

const getFilmsByTitle = async (req, res) => {
  console.log('films:getFilmsByTitle:', req.query);
  const { title, length } = req.query;

  if (!title && !length) {
    console.log('S103:');
    res.status(418).json({
      code: 'S103',
      message: 'Please send in either a title or length of title for search'
    })
    return;
  }

  try {
    let query = 'SELECT * FROM film WHERE 1=1';

    if (title) {
      query += `AND title ILIKE '${title}%'`;
    }

    if (length) {
      query += `AND LENGTH(title) < ${length}`
    }

    const { rows } = await db.query(query);
    res.json(rows);

  } catch (e) {
    console.log('S104:', e);
    res.status(418).json({
      code: 'S104',
      message: 'Error fetching films by title'
    })
  }
}

const getCategories = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT category_id, name FROM category');
    res.json(rows);

  } catch (e) {
    console.log('S105:', e);
    res.json([])
  }
}

module.exports = {
  getFilmsByCategory,
  getFilmsByTitle,
  getCategories
}