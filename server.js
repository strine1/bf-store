const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let players = [];

app.use(express.static('public'));  // لنتمكن من الوصول للملفات الثابتة (HTML, CSS, JS)

io.on('connection', (socket) => {
    console.log('A player connected: ' + socket.id);

    // عند انضمام لاعب جديد
    socket.on('join-game', (name) => {
        players.push({ id: socket.id, name, role: 'Crewmate' });
        io.emit('update-players', players);  // إرسال قائمة اللاعبين للجميع
    });

    // بدء اللعبة
    socket.on('start-game', () => {
        const impostorsCount = Math.max(1, Math.floor(players.length / 4));  // تحديد عدد Impostors
        const shuffledPlayers = shuffle(players);

        // تعيين أدوار Impostor
        for (let i = 0; i < impostorsCount; i++) {
            shuffledPlayers[i].role = 'Impostor';
        }
        // تعيين أدوار Crewmate
        for (let i = impostorsCount; i < shuffledPlayers.length; i++) {
            shuffledPlayers[i].role = 'Crewmate';
        }

        // إرسال الأدوار للاعبين
        io.emit('game-started', shuffledPlayers);
    });

    // قتل لاعب
    socket.on('kill-player', (targetId) => {
        io.emit('player-killed', targetId);  // إعلام الجميع
    });

    // عند قطع الاتصال
    socket.on('disconnect', () => {
        players = players.filter(player => player.id !== socket.id);
        io.emit('update-players', players);  // تحديث اللاعبين بعد الخروج
        console.log('Player disconnected: ' + socket.id);
    });
});

// دالة لخلط اللاعبين بشكل عشوائي
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];  // تبديل العناصر
    }
    return array;
}

// بدء الخادم على المنفذ 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
