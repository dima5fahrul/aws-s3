var express = require('express');
const Validator = require('fastest-validator');
var router = express.Router();
const v = new Validator();

const {Mahasiswa} = require('../models');

router.get('/', async (req, res) => {
    const mahasiswa = await Mahasiswa.findAll();
    return res.json(mahasiswa);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const mahasiswa = await Mahasiswa.findByPk(id);
    return res.json(mahasiswa);
});

router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        email: 'string',
        gender: 'string',
    }

    const validate = v.validate(req.body, schema);

    if(validate.length){
        return res.status(400).json(validate);
    };

    //buat data mahasiswa
    const mahasiswa = await Mahasiswa.create(req.body);
    return res.json(mahasiswa);
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;

    let mahasiswa = await Mahasiswa.findByPk(id);
    if(!mahasiswa){
        return res.status(404).json({message: 'Mahasiswa not found'});
    }

    const schema = {
        name: 'string|optional',
        email: 'string|optional',
        gender: 'string|optional',
    }

    const validate = v.validate(req.body, schema);

    if(validate.length){
        return res.status(400).json(validate);
    };

    mahasiswa = await Mahasiswa.update(req.body, {where: {id: id}});
    return res.json(mahasiswa);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    let mahasiswa = await Mahasiswa.findByPk(id);
    if(!mahasiswa){
        return res.status(404).json({message: 'Mahasiswa not found'});
    }

    mahasiswa = await Mahasiswa.destroy({where: {id: id}});
    return res.json({message: 'Mahasiswa deleted'});
});

module.exports = router;