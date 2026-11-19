const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const logDirectory = path.join(__dirname, 'logs');
fs.mkdirSync(logDirectory, { recursive: true });

// Middleware to log requests
app.use((req, res, next) => {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
    fs.appendFileSync(path.join(logDirectory, 'access.log'), log);
    next();
});

// Serve static files
app.get('/', (req, res) => res.sendFile('index.html', { root: __dirname }));
app.use(express.static(path.join(__dirname, 'public')));

// API route example (Cart system)
app.post('/api/cart', express.json(), (req, res) => {
    res.json({ message: "Item added to cart", item: req.body.item });
});

// Start server
if (require.main === module) {
    app.listen(PORT, () => console.log(`EcoNest Living running on port ${PORT}`));
}

module.exports = app;
