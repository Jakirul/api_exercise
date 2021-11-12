const express = require('express')
const app = express()
const cors = require('cors');

const Profile = require('./models/profiles');
app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
    const profileData = Profile.names;
    res.send(profileData);
});

app.post('/', (req, res) => {
    const data = req.body;
    const newProfile = Profile.create(data);
    res.status(201).send(newProfile);
});

app.get('/:name', (req, res) => {
    try {
        console.log(req.params.name)
        const profileName = req.params.name;
        console.log(profileName)
        const selectedProfile = Profile.findByName(profileName);
        if (!selectedProfile) {
            throw new Error("This profile does not exist!");
        } 
        res.send(selectedProfile)

    } catch (err) {
        console.log(err)
        res.status(404).send({message: err.message})
    }
})

module.exports = app