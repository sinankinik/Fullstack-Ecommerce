const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User.js")

const generateRandomAvatar = () => {
    const randomAvatar = Math.floor(Math.random() * 71);
    return `https://i.pravatar.cc/300?img=${randomAvatar}`;
}

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body
        const defaultAvatar = generateRandomAvatar();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "Email address already registered." })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await new User({
            username, email, password: hashedPassword, avatar: defaultAvatar
        })

        await newUser.save();

        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server Error" })
    }
})


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid E-Mail" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid Password" })
        }

        res.status(200).json({
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            avatar: user.avatar
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server Error" })
    }
})

module.exports = router