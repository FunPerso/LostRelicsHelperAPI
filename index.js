const express = require('express');
const mongoose = require('mongoose')
const app = express();
const url = "mongodb+srv://dadilium:yqRlUPg2Ekyz0ls3@cluster0.lr5zp5g.mongodb.net/?retryWrites=true&w=majority"
app.use(express.json());

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on('open', () => {
  console.log('db connected')
});

con.on('close', () => {
  console.log('db closed')
});

//LR api
const LRItemsRouter = require('./routes/LostRelics/items');
const LRRunsRouter = require('./routes/LostRelics/runs');
app.use('/LR/items', LRItemsRouter);
app.use('/LR/runs', LRRunsRouter);

//stat api
const statSSRouter = require('./routes/Stats/shadowStones');
const itemRateRouter = require('./routes/Stats/itemRate');
const mapRateRouter = require('./routes/Stats/mapRate');
const summaryRouter = require('./routes/Stats/summary');
app.use('/stats/shadowstones', statSSRouter);
app.use('/stats/itemRate', itemRateRouter);
app.use('/stats/mapRate', mapRateRouter); 
app.use('/stats/summary', summaryRouter); 

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
