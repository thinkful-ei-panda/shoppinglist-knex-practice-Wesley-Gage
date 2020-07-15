require('dotenv').config();
const knex = require('knex');  


const DB = knex ({
  client : 'pg',
  connection : process.env.DB_URL
});


// console.log('working');

  

const getItems = (searchTerm) => {
  DB 
    .select()
    .from('shopping_list')
    .where('item_name','ILIKE', `%${searchTerm}%`)
    .then( r => {
      console.log(r);
        
    })
    .catch(e => console.log(e)
    )
    .finally(()=> DB.destroy());
};


//getItems('chicken');

const searchByPageNumber = (pn) =>{
  const x = 6;
  const offset = x * ( pn - 1);
  DB
    .select()
    .from('shopping_list')
    .limit(x)
    .offset(offset)
    .then( r => console.log(r))
    .catch( e => console.log(e))
    .finally( () => DB.destroy() );
};

//searchByPageNumber(2);

const getItemAfterDate = (date) => {
  DB
    .select()
    .from('shopping_list')
    .where( 
      'date_added',
      '<',
      DB.raw('now() - \'?? days\' :: INTERVAL', date))
    .then( r => console.log(r))
    .catch( e => console.log(e))
    .finally( () => DB.destroy() );
};

//getItemAfterDate(20);

const getItemTotalCost = () =>{
  DB
    .select('category')
    .from('shopping_list')
    .sum('price as total')
    .groupBy('category')
    .then( r => console.log(r))
    .catch( e => console.log(e))
    .finally( () => DB.destroy() );
};

console.log(getItemTotalCost());
