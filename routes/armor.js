const express = require('express');
const router = express.Router();

const armorControl = require('../controllers/armor');

router.get('/', armorControl.getAll);
router.get('/:id', armorControl.getSingle);
router.post('/', armorControl.createItem);
router.put('/:id', armorControl.updateItem);
router.delete('/:id', armorControl.deleteItem);

module.exports = router;