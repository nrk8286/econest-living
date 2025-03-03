const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to log requests
app.use((req, res, next) => {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
    fs.appendFileSync('logs/access.log', log);
    next();
});

// Serve static files
app.use(express.static('public'));

// API route example (Cart system)
app.post('/api/cart', express.json(), (req, res) => {
    res.json({ message: "Item added to cart", item: req.body.item });
});

// Start server
app.listen(PORT, () => console.log(`EcoNest Living running on port ${PORT}`));
