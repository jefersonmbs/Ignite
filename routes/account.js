var express = require('express');
const { v4: uuidv4 } = require('uuid');

var router = express.Router();

const customers = []

/* POST create account*/
router.post('/create', function(req, res) {
    const {cpf , name} = req.body;

    const customrsExist = customers.some(customer => customer.cpf === cpf);

    if(customrsExist) {
        res.status(400).json({error: 'Customer already exists'});
    }else {
        const id = uuidv4();
        customers.push({id , cpf, name , statement: []});
        res.status(201).json({id, cpf, name});
    }
});

/* GET list all customers */
router.get('/list', function(req, res) {
    res.json(customers);
});

/* GET statement user by cpf*/
router.get('/statement', function(req, res) {
    const {cpf} = req.headers;

    const customer = customers.find(customer => customer.cpf === parseInt(cpf));

    if(!customer) {
        res.status(400).json({error: 'Customer not found'});
    }else {
        res.json(customer.statement);
    }
});

module.exports = router;
