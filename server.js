const express = require('express');
const cors=require('cors')
const { Sequelize } = require('sequelize');
const Competitor = require('./models/competitor.js');


const sequelize = new Sequelize('competitors', 'root', 'Koleso98', {
  host: 'localhost',
  dialect: 'mysql',
});



const app = express();

const corOptions={
  oirigin:'http://localhost:3000/'
}

app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/competitors', async (req, res) => {
    console.log('Fetching competitors...');
    const competitors = await Competitor.findAll();
    res.send(competitors);
 
});

app.get('/', (req, res) => {
  res.send('Hello, server is running!');
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const PORT=process.env.PORT||4000

app.listen(PORT, () => {  
  console.log('Server is running on port 4000');
});
