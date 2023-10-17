const express = require('express');
const cors = require('cors');
const tasks = require('./task.json'); // Assuming tasks.json is in the root of the server directory

const app = express();

app.use(cors());

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
