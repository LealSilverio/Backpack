const express = require('express');
const router = express.Router();

const healController = require('../controllers/healing');

router.get('/', healController.getAll);
router.get('/:id', healController.getSingle);
router.post('/', healController.createItem);
router.put('/:id', healController.updateItem);
router.delete('/:id', healController.deleteItem);

module.exports = router;