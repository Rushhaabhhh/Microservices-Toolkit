import z from 'zod';
import morgan from 'morgan';
import bcrypt from 'bcryptjs';
import express from 'express';
import { validateRequestBody } from 'zod-express-middleware';

import { User } from './models';
import { signJWT } from './middleware';

const app = express();


app.use(express.json());
app.use(morgan('common'));


app.post('/', validateRequestBody(z.object({
    username : z.string(),
    password : z.string(),
    })),
    async (req, res) => {
        try {
            const { username, password} = req.body;
            const user = await User.findOne({username});

            if(user) {
                res.status(400).json({ error : "Username already exists"})
                return;
            }
            bcrypt.hash(password, 10, async (err, hash) => {
                if(err) {
                    res.status(500).json({ error : (err as Error).message });
                    return;
                }

                try {
                    const newUser = await User.create({ username, password : hash });
                    const token = signJWT(newUser.id);
                    res.status(201)
                    res.json({ result: { user: newUser, access_token: token } });
                } catch (e) {
                    res.status(500).json({ error: (e as Error).message });
                    return;
                }
            });
        } catch (e) {
        res.status(500).json({ error: (e as Error).message });
        }
    }
);

app.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user) {
            res.status(404).json({ error : "User not Found"});
            return;
        }
        res.json({ result : user });
    } catch (err) {
        res.status(500).json({ error : (err as Error).message });
    }
})

app.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json({ result : users });
    } catch (err) {
        res.status(500).json({ error : (err as Error).message });
    }
})
export default app;