const res = require("express/lib/response");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
    const body = req.body;

    if (!(body.email && body.password)) {
        return res.status(400).send({ error: "Data not formatted properly" });
    }
    if (body.password == body.confirmPassword) {
        // creating a new mongoose doc from user data
        try {
            const user = new User(body);
            const salt = await bcrypt.genSalt(10);
            // now we set user password to hashed password
            user.password = await bcrypt.hash(user.password, salt);
            let data = await user.save();
            let { password, ...others } = data._doc;
            res.status(200).json({
                status: "Success",
                data: {...others },
            });
        } catch (error) {
            console.log(error);
            res.status(200).json({ status: "Failure", message: "DB error" });
        }
    } else {
        res.send("password not match");
    }
}

async function userLogin(req, res) {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, user.password);
        const accessToken = jwt.sign({
                id: user._id,
            },
            "prit", { expiresIn: "3d" }
        );
        if (validPassword) {
            res
                .status(200)
                .json({ message: "Login Success", token: accessToken, userData: user });
        } else {
            res.status(400).json({ error: "Invalid Credentials" });
        }
    } else {
        res.status(401).json({ error: "User does not exist" });
    }
}

async function userDashboard(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const users = await User.find().limit(limit * 1).skip((page - 1) * limit);
        res.status(200).json({ total: users.length, users });
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

// async function authenticateToken(req, res, next) {

//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (token == null) return res.sendStatus(401);

//     jwt.verify(token, process.env.TOKEN_SECRET as string,
//         (err: any, user: any) => {
//             console.log(err);

//             if (err) return res.sendStatus(403);

//             req.user = user;

//             next();
//         });
// }

module.exports = {
    createUser,
    userLogin,
    userDashboard,
    // authenticateToken,
};