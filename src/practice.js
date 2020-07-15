require('dotenv').config();
const knex = require('knex');

const DB = knex ({
  client : 'pg',
  connection : process.env.DB_URL
});

// console.log('knex and driver installed correctly');



// knexInstance('amazong_products')
//     .select()
//     .from()

// const q1 = knexInstance('amazong_products').select('*').toQuery();
// const q2 = knexInstance.from('amazong_products').select('*').toQuery();

// console.log('q1 ===', q1);
// console.log('q2 ===', q2);

// knexInstance
//   .select('video_name','region')
//   .count('date_viewed AS views')
//   .from('whopipe_video_views')
//   .where( 'date_viewed', 
//             '>',
//              (now() - 30days ::INTERVAL)')
//   .groupBy('video_name','region')
//   .orderBy('region','asc','views','desc')
//   .then( result =>{
//     console.log(result);
//   })
//   .finally(() => knexInstance.destroy());


// const mostPopularVideosForDays = (days) => { 
//   knexInstance
//     .select('video_name', 'region')
//     .count('date_viewed AS views')
//     .where(
//       'date_viewed',
//       '>',
//       knexInstance.raw('now() - \'?? days\' :: INTERVAL', days)
//     )
//     .from('whopipe_video_views')
//     .groupBy('video_name','region')
//     .orderBy([
//       {column: 'region', order: 'ASC'},
//       {column: 'views', order: 'DESC'},
//     ])
//     .then( result =>{
//       console.log(result);
//     })
//     .finally(() => knexInstance.destroy());
// };

// mostPopularVideosForDays(30);





