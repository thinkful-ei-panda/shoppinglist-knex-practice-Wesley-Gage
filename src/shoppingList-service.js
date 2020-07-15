const shoppingListService = {
  getAllShoppingListItems(db){
    return db
      .select()
      .from('shopping_list');
  },

  getById(db,id){
    return db.select()
      .from('shopping_list')
      .where('product_id',id)
      .first();
  },

  createNewListItem(db,newItem){
    return db
      .insert(newItem)
      .into('shopping_list')
      .returning('*')
      .then(rows => rows[0]);
  },

  deleteItem(db,id){
    return db('shopping_list')
      .where('product_id',id)
      .delete();
  },

  updateItem(db,id,newItemFields){
    return db('shopping_list')
      .where('product_id',id)
      .update(newItemFields);
  }
};

module.exports = shoppingListService;