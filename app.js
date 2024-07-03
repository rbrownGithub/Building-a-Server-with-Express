// Import required modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Middleware: Morgan for HTTP request logging
app.use(morgan('dev'));

// Middleware: Body parser for parsing application/json
app.use(bodyParser.json());

// Routes
// Root route
app.get('/', (req, res) => {
    res.send('Welcome to my Express server!');
});

// About route
app.get('/about', (req, res) => {
    res.send('This is a basic Express server with middleware.');
});

// Handling non-existent routes (404)
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
