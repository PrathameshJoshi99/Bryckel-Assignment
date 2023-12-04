const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/database name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  id: String,
  category: String,
  title: String,
  userData: Object,
  created_at: { type: Date, default: Date.now },
});

const DataModel = mongoose.model('Data', dataSchema);

app.post('/api/saveData', (req, res) => {
  const data = new DataModel(req.body);
  data.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Data saved successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
