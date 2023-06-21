const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get user
const getUser = async (req, res, next) => {
    try{
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db('cse-341-sprint23-team8-project-tesla').collection('users').findOne({ _id: userId });
        if (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            return res.status(404).json({ message: 'User not found '})
        }
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: 'Something went wrong.' })
    }
}

// Create user
const createUser = async (req, res, next) => {
    let { email, firstName, lastName } = req.body;

    newUser = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        method: 'github'
    }

    result = await mongodb.getDb().db('cse-341-sprint23-team8-project-tesla').collection('user').insertOne(newUser);
    if (result.acknowledged) {
        res.status(201).json({ message: 'User created successfully with id: ', id: result.insertedId });
    }


}
// Delete user

// Edit user


module.exports = { getUser, createUser }
