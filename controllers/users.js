const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
require('passport')
require('express-session')


// Get user
// const getUser = async (req, res, next) => {
//     try{
//         const userId = new ObjectId(req.params.id);
//         const result = await mongodb.getDb().db('cse-341-sprint23-team8-project-tesla').collection('user').findOne({ _id: userId });
//         if (result) {
//             res.setHeader('Content-Type', 'application/json');
//             res.status(200).json(result);
//         } else {
//             return res.status(404).json({ message: 'User not found '})
//         }
//     } catch(err) {
//         console.error(err)
//         res.status(500).json({ message: 'Something went wrong.' })
//     }
// }

// // Create user
// const createUser = async (req, res, next, newUser) => {
//     result = await mongodb.getDb().db('cse-341-sprint23-team8-project-tesla').collection('user').insertOne(newUser);
//     if (result.acknowledged) {
//         res.status(201).json({ message: 'User created successfully with id: ', id: result.insertedId });
//     }
// }

// Delete user
const deleteUser = async (req, res, next) => {
    try {
        console.log(req.session.passport)
        if (req.user) {
            const googleId = req.user.googleId;
            const result = await mongodb.getDb().db('cse-341-sprint23-team8-project-tesla').collection('user').deleteOne({ googleId: googleId })
            console.log(result);
            if (result) {
                res.status(200).json({ message: 'User deleted successfully ' + googleId })
            } else {
                res.status(404).json({ message: 'User not found' })
            }
        } else {
            res.status(401).json({ message: 'User not logged in' });
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' })
    }
}
// Edit user


module.exports = { deleteUser }
