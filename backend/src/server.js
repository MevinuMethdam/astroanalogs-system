const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const analogController = require('./controllers/analogController');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

app.get('/api/v1/analogs/match', analogController.getBestAnalogs);

io.on('connection', (socket) => {
    console.log('New NASA Field Researcher Connected:', socket.id);

    setInterval(() => {
        socket.emit('live_environment_update', {
            location: 'Thrihnukagigur, Iceland',
            mars_equivalent: 'Pavonis Mons, Mars',
            current_radiation_diff: (Math.random() * 5 + 10).toFixed(2) + ' mSv'
        });
    }, 10000);

    socket.on('disconnect', () => console.log('User Disconnected'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`AstroAnalogs Core Server running on port ${PORT}`);
});