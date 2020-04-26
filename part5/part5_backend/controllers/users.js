const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, likes: 1, url: 1})
    response.json(users.map(user=>user.toJSON()))
})

userRouter.post('/', async (request, response) => {
    const body = request.body
    const saltRounds = 10
    if (!(body.username && body.password)){ // check if empty
        return response.json({error: "username and password field are required!"})
    }
    else if (!(body.username.length>2 && body.password.length>2)){
        return response.json({error: "username and password minlength is 3"})
    }

    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const newUser = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash
    })

    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
})

module.exports = userRouter