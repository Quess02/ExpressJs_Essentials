const express = require('express');
const loans = express.Router();

loans.get('/', (req, res) => {
    res.send('Loans works');
});

//Route parameters
loans.get('/:id', (req, res) => {
    let id = req.params.id;
    res.send(`Loan id ${id}`);
});
module.exports = loans;