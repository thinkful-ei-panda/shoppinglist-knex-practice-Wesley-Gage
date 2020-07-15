require('dotenv').config();
const knex = require('knex');
const shoppingList = require ('./shoppingList-service');

const db = knex({
  client: 'pg',
  connection: process.env.DB_URL
});



console.log(shoppingList.getAllShoppingListItems());

