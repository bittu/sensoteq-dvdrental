const express = require('express');
const { addCustomer, deleteCustomer, getStores, getCities, getCustomers } = require('./customer');
const { getFilmsByCategory, getFilmsByTitle, getCategories } = require('./films');
const router = express.Router();

router.get('/filmsByCategory', getFilmsByCategory)
router.get('/filmsByTitle', getFilmsByTitle)
router.post('/addCustomer', addCustomer)
router.post('/deleteCustomer', deleteCustomer)

router.get('/categories', getCategories)
router.get('/stores', getStores)
router.get('/cities', getCities)
router.get('/customers', getCustomers)

module.exports = router;