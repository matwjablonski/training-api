const express = require("express");
const app = express();
const cors = require('cors');

const JSONdb = require('simple-json-db');
const db = new JSONdb('./db.json');

const TransfersRouter = require("./controllers/transfers");
const UserRouter = require("./controllers/user");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.get('/api', (req, res) => {
    res.json({
      availableRoutes: {
        '/api': ['GET'],
        '/api/transfers': ['GET', 'POST'],
        '/api/transfers/:id': ['GET'],
        '/api/transfers/search/:title': ['GET'],
        '/api/transfers/search/:minValue/:maxValue': ['GET'],
        '/api/user': ['GET', 'POST'],
      }
    })
  });

app.use('/api/transfers', TransfersRouter);
app.use('/api/user', UserRouter);

app.listen(8000, () => {
 console.log("Server running on port 8000");
});
