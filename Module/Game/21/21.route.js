import express from "express";
import {authenticate} from "../../../middleware/passport.js";
import {Game, Player} from "./21.calss.js";
import http from "http";
import {Server} from "socket.io";

const game = new Game();
const router = express.Router();
import {createServer} from "http";

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },

  // path: "/game/21",
});
io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected.`);
  io.emit('connected', {id: socket.id});


  // 加入游戏
  socket.on('join', (data) => {
    const player = new Player(data.name);
    game.addPlayer(player);
    socket.player = player;
    console.log(`Player ${player.name} joined the game.`);
    io.emit('player-joined', {name: player.name});
    io.emit('players', game.players.map((player) => player.name));
  });

  // 开始游戏
  socket.on('start', () => {
    try {
      game.start();
      io.emit('game-started');
    } catch (error) {
      socket.emit('error', error.message);
    }
  });

  // 下注
  socket.on('bet', (data) => {
    game.placeBet(socket.player, data.amount);
    io.emit('bet-placed', {name: socket.player.name, amount: data.amount});
  });

  // 拿牌
  socket.on('hit', () => {
    const card = game.dealCard();
    socket.player.addCard(card);
    io.emit('card-dealt', {name: socket.player.name, card});
  });

  // 停牌
  socket.on('stand', () => {
    socket.player.stand();
    io.emit('player-stood', {name: socket.player.name});
  });

  // 断开连接
  socket.on('disconnect', () => {
    game.removePlayer(socket.player);
    console.log('断开');
    // console.log(`Player ${socket.player.name} left the game.`);
    // io.emit('player-left', {name: socket.player.name});
  });
});
server.listen(3001, () => {
  console.log('listening on *:3001');
});
export default router;
