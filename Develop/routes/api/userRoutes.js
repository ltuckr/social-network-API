const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller');

//all users
router.route('/').get(getAllUsers).post(createUser);

//get user by ID, update user, delete user
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

//add friend, remove friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;