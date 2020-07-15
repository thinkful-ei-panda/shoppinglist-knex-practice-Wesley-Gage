const shoppingListService = require('../src/shoppingList-service.js');
const knex = require('knex');
const { expect } = require('chai');

describe('Shopping List Service', () =>{
  let db;

  

  before(() => {
    db=knex({
      client:'pg',
      connection: process.env.TEST_DB_URL
    });
  });

  before(() => 
    db('shopping_list').truncate()
  );

  afterEach(() => 
    db('shopping_list').truncate()
  );

  after(() => db.destroy());

  context('there exists stuff in shopping list',() => {
    const shoppingTestData=[
      {
        product_id: 1,
        item_name: 'Apple',
        date_added: new Date(),
        checked: true,
        price:'12.00',
        category:'Main',
      },
      {
        product_id: 2,
        item_name: 'Banana',
        date_added: new Date(),
        checked: true,
        price:'12.00',
        category:'Main',
      },
      {
        product_id: 3,
        item_name: 'Kiwi',
        date_added: new Date(),
        checked: true,
        price:'12.00',
        category:'Main',
      },
    ];
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(shoppingTestData);
    });

    it('getAllShoppingListItems() returns an array of items', () => {
      return shoppingListService.getAllShoppingListItems(db)
        .then(actual => {
          expect(actual).to.eql(shoppingTestData);
        });
    });

    it('getById returns an item with matching id', () => {
      const thirdId = 3;
      const thirdItem = shoppingTestData[thirdId-1];
      return shoppingListService.getById(db,thirdId)
        .then(actual => {        
          expect(actual).to.eql(thirdItem);
        });
    });

    it('deleteItem() returns nothing', () => {
      const thirdId = 3
      return shoppingListService.deleteItem(db,thirdId)
      .then(() => {
        shoppingListService.getAllShoppingListItems(db)
        .then(result => {
          const actual = shoppingTestData.filter(item => item.product_id !== thirdId)
          expect(result).to.eql(actual)
        });        
      });      
    });

    it('updateItem() returns', () =>{
      const thirdId = 3
      newItem = {
        item_name: 'Coconut',
        date_added: new Date(),
        checked: true,
        price:'12.00',
        category:'Main',
      }

      return shoppingListService.updateItem(db,thirdId,newItem)
      .then(() => {
        return shoppingListService.getById(db,thirdId)        
      })      
      .then(result => {        
        expect(result).to.eql({product_id:thirdId,...newItem})
      })
    })
  });
  
  context('there doesn\'t exist stuff in shopping list',() => {
    it('getAllShoppingListItems() returns an empty array', () => {
      return shoppingListService.getAllShoppingListItems(db)
        .then(actual => {
          expect(actual).to.eql([]);
        });
    });  

    it('createNewListItem()', () => {
      const newItem={
        item_name: 'Lemon',
        date_added: new Date(),
        checked: true,
        price:'12.00',
        category:'Main',
      };
      return shoppingListService.createNewListItem(db,newItem)
        .then(actual => {
          expect(actual).to.eql({...newItem,"product_id":1});
        });
    });
  });  
});