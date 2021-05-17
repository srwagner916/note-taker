//// Dependencies
///
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
//
///
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//

// Use api and html routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//// Listen
//--------------------------------------------------------------------//
app.listen(PORT, () => console.log(`API server now on port ${PORT}!!`));