import { app } from "./app.mjs"
import {sequelize }from './models/tableConnection.mjs'
 

app.get('/', (req, res) => {
  res.send('hello world')
})

const port = process.env.PORT || 5000

app.listen(port, () => { 
   sequelize.sync().then(() => {
     console.log('Database synced successfully');
   }).catch((error) => {

     console.error('Error syncing database:', error);
   });
  console.log(`App listening on port ${port}`)
})
 