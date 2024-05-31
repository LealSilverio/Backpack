const express = require('express');
const router = express.Router();

const armorCon = require('../controllers/armor');

router.get('/', armorCon.getAll);
router.get('/:id', armorCon.getSingle);
router.post('/', armorCon.createItem);
router.put('/:id', armorCon.updateItem);
router.delete('/:id', armorCon.deleteItem);

module.exports = router;