const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

async function signup(req, res) {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = bcrypt.hashSync(password, 8);

        const user = await User.create({ name, email, password: hashedPassword });

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ msg: "user not found" });

        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) return res.status(401).json({ msg: "invalid" });

        const token = jwt.sign({
            sub: user._id
        }, process.env.SECRET);

        res.json({ token, name: user.name, email: user.email });
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
}

module.exports = {
    signup,
    login,
};