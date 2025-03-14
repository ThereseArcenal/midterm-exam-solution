const express = require('express');
const app = express();
const port = 3000; 

app.get('/test', (req, res) => {
    res.json({ message: 'Express is working! Therese Andrei C. Arcenal' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
