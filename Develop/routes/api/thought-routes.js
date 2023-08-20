const router = require('express').Router();
const{
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
  
} = require('../../controllers/thoughtController');

// get all thoughts, create thought
router.route('/').get(getAllThoughts).post(createThought);

// get thought by ID, update thought, delete thought
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

module.exports = router;

