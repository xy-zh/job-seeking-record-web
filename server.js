const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 4000;

const applications = require('./applications');
const users = require('./users');

const sessions = require('./sessions');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({error: 'authMissing'});
        return;
    }
    res.json({username});
});

app.post('/api/session', (req, res) => {
    const {username} = req.body;
    if (!username) {
        res.status(400).json({error: 'requiredUsername'});
        return;
    }
    if (username.toLowerCase() === 'dog') {
        res.status(403).json({error: 'authInsufficient'});
        return;
    }
    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);
    if (!existingUserData) {
        users.addUserData(username, applications.makeApplicationList());
    }
    res.cookie('sid', sid);
    res.json(users.getUserData(username).getApplications());
});

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (sid) {
        res.clearCookie('sid');
    }
    if (username) {
        sessions.deleteSession(sid);
    }
    res.json({username});
});

// Applications
app.get('/api/applications', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({error: 'authMissing'});
        return;
    }
    res.json(users.getUserData(username).getApplications());
});

app.post('/api/applications', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({error: 'authMissing'});
        return;
    }
    const newApplication = req.body.application;

    const applicationList = users.getUserData(username);
    if (!applicationList.isValidItem(newApplication)) {
        res.status(400).json({error: 'invalidInput'});
        return;
    }

    const id = applicationList.addApplication(newApplication);
    res.json(applicationList.getApplication(id));
});

app.get('/api/applications/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({error: 'authMissing'});
        return;
    }
    const applicationList = users.getUserData(username);
    const {id} = req.params;

    if (!applicationList.contains(id)) {
        res.status(404).json({error: `noSuchId`, message: `No application with id ${id}`});
        return;
    }

    res.json(applicationList.getApplication(id));
});

app.put('/api/applications/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({error: 'authMissing'});
        return;
    }

    const applicationList = users.getUserData(username);
    const {id} = req.params;
    const application = req.body;

    if (!application) {
        res.status(400).json({error: 'requiredSubmission'});
        return;
    }
    if (!applicationList.contains(id)) {
        res.status(404).json({error: `noSuchId`, message: `No application with id ${id}`});
        return;
    }
    if (!applicationList.isValidItem(application)) {
        res.status(400).json({error: 'invalidInput'});
        return;
    }

    applicationList.updateApplication(id, application);
    res.json(applicationList.getApplication(id));
});

app.patch('/api/applications/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({error: 'authMissing'});
        return;
    }

    const {id} = req.params;
    const {application, history} = req.body;
    const applicationList = users.getUserData(username);

    if (!applicationList.contains(id)) {
        res.status(404).json({error: `noSuchId`, message: `No application with id ${id}`});
        return;
    }
    if (!applicationList.isValidItem(application)) {
        res.status(400).json({error: 'invalidInput'});
        return;
    }

    applicationList.updateApplication(id, application, history);
    res.json(applicationList.getApplication(id));
});

app.delete('/api/applications/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !username) {
        res.status(401).json({error: 'authMissing'});
        return;
    }
    const {id} = req.params;
    const applicationList = users.getUserData(username);
    const itemFound = applicationList.contains(id);
    if (itemFound) {
        applicationList.deleteApplication(id);
    }
    res.json({message: itemFound ? `application ${id} deleted` : `application with ${id} did not exist`});
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

