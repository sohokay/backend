import express from "express";
import {authenticate} from "../../../middleware/passport.js";
import {Game,Player} from "../Game.calss.js";
import http from "http";
import {Server } from "socket.io";
const game = new Game();
const router = express.Router();
const io = new Server(3001);

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected.`);

  // 加入游戏
  socket.on('join', (data) => {
    const player = new Player(data.name);
    game.addPlayer(player);
    socket.player = player;
    console.log(`Player ${player.name} joined the game.`);
    io.emit('player-joined', { name: player.name });
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
    io.emit('bet-placed', { name: socket.player.name, amount: data.amount });
  });

  // 拿牌
  socket.on('hit', () => {
    const card = game.dealCard();
    socket.player.addCard(card);
    io.emit('card-dealt', { name: socket.player.name, card });
  });

  // 停牌
  socket.on('stand', () => {
    socket.player.stand();
    io.emit('player-stood', { name: socket.player.name });
  });

  // 断开连接
  socket.on('disconnect', () => {
    game.removePlayer(socket.player);
    console.log(`Player ${socket.player.name} left the game.`);
    io.emit('player-left', { name: socket.player.name });
  });
});

export default router;
