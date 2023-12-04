const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
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

app.post(
  '/api/saveData',
  [
    body('userData.name').notEmpty().isString(),
    body('userData.phone').notEmpty().isString(),
    body('userData.email').notEmpty().isEmail(),
    body('category').notEmpty().isString(),
    body('title').notEmpty().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const data = new DataModel(req.body);
      await data.save();
      res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
