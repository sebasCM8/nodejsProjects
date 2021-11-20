const express = require('express');
const router = express.Router();

const pool = require('../db/database');

router.get('/users', async (req, res) => {
    const users = await pool.query('SELECT * FROM user');

    res.status(200).send(users);
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const existingUsername = await pool.query('SELECT * FROM user WHERE us_username = ?', [username]);
    if (existingUsername.length > 0) {
        var responseData = { ok: false, msg: 'The username already exist, please choose another' };
        return res.status(200).send(responseData);
    }

    const newUser = {
        us_username: username,
        us_password: password
    };
    const data = await pool.query('INSERT INTO user SET ?', [newUser]);
    console.log(data);

    req.session.userId = data.insertId; //saving session
    const resData = {
        userId: data.insertId,
        ok: true
    };
    res.status(200).send(resData);
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userExist = await pool.query('SELECT * FROM user WHERE us_username = ?', [username]);
    //console.log(userExist);
    if (userExist.length > 0) {
        if (password === userExist[0].us_password) {
            req.session.userId = userExist[0].us_id; // saving session
            res.status(200).send({
                ok: true,
                username: userExist[0].us_username,
                password: userExist[0].us_password,
                id: userExist[0].us_id
            });
        } else {
            res.status(200).send({
                ok: false,
                msg: 'Incorrect password'
            });
        }
    } else {
        res.status(200).send({
            ok: false,
            msg: 'The username does not exist'
        });
    }
});

router.get('/isLogged', async (req, res) => {
    console.log(req.session);
    if (req.session.userId) {
        const id = req.session.userId;
        const data = await pool.query('SELECT * FROM user WHERE us_id = ?', [id]);
        
        res.status(200).send({
            ok: true,
            id: id,
            username: data[0].us_username,
            password: data[0].us_password
        });
    }else{
        res.status(200).send({
            ok:false
        });
    }
});

module.exports = router;