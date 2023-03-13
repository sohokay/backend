class Game {  // 游戏类
  constructor() {   // 构造函数
    this.players = [];// 玩家
    this.deck = []; // 牌堆
    this.dealer = new Player('Dealer'); // 庄家
    this.state = 'idle'; // 游戏状态
    this.betAmount = 0; // 下注金额
  }

  addPlayer(player) { // 添加玩家
    this.players.push(player);  // 将玩家添加到玩家数组中
  }

  removePlayer(player) {  // 移除玩家
    const index = this.players.indexOf(player); // 获取玩家在玩家数组中的索引
    if (index !== -1) { // 如果玩家存在
      this.players.splice(index, 1);  // 从玩家数组中移除玩家
    }
  }

  start() { // 开始游戏
    if (this.state !== 'idle') {  // 如果游戏状态不是空闲状态
      throw new Error('Invalid game state.'); // 抛出错误
    } else if (this.players.length < 1) { // 如果玩家数量小于1
      throw new Error('Not enough players.'); // 抛出错误
    } else if (this.betAmount === 0) { // 如果下注金额为0
      throw new Error('No bets placed.'); // 抛出错误
    }

    this.shuffleDeck(); // 洗牌
    this.state = 'betting'; // 切换到下注状态
    this.betAmount = 0; // 重置下注金额
  }

  placeBet(player, amount) {  // 下注
    if (this.state !== 'betting') { // 如果游戏状态不是下注状态
      throw new Error('Invalid game state.'); // 抛出错误
    } else if (player.balance < amount) { // 如果玩家余额小于下注金额
      throw new Error('Not enough balance.'); // 抛出错误
    } else if (amount < this.betAmount) { // 如果下注金额小于最小下注金额
      throw new Error('Bet amount too low.'); // 抛出错误
    } else if (amount > player.balance) { // 如果下注金额大于玩家余额
      throw new Error('Bet amount too high.'); // 抛出错误
    } else if (this.players.indexOf(player) === -1) { // 如果玩家不存在
      throw new Error('Player not in game.'); // 抛出错误
    } else if (player.standing) { // 如果玩家已经停牌
      throw new Error('Player already stood.'); // 抛出错误
    } else if (player.hand.length > 0) { // 如果玩家已经拿过牌
      throw new Error('Player already dealt.'); // 抛出错误
    } else if (this.players.every((p) => p.standing)) { // 如果所有玩家都已经停牌
      throw new Error('All players stood.'); // 抛出错误
    } else if (this.players.every((p) => p.hand.length > 0)) { // 如果所有玩家都已经拿过牌
      throw new Error('All players dealt.'); // 抛出错误
    } else if (this.players.filter((p) => p.hand.length > 0).length > 0) { // 如果有玩家已经拿过牌
      throw new Error('Some players dealt.'); // 抛出错误
    } else if (this.players.filter((p) => p.standing).length > 0) { // 如果有玩家已经停牌
      throw new Error('Some players stood.'); // 抛出错误
    } else if (this.players.filter((p) => p.balance < amount).length > 0) { // 如果有玩家余额小于下注金额
      throw new Error('Some players have insufficient balance.'); // 抛出错误
    } else if (this.players.filter((p) => p.balance > amount).length > 0) { // 如果有玩家余额大于下注金额
      throw new Error('Some players have excess balance.'); // 抛出错误
    } else if (this.players.filter((p) => p.balance === amount).length < 1) { // 如果没有玩家余额等于下注金额
      throw new Error('No players have equal balance.'); // 抛出错误
    } else if (this.players.filter((p) => p.balance === amount).length > 1) { // 如果有多个玩家余额等于下注金额
      throw new Error('Multiple players have equal balance.'); // 抛出错误
    }

    player.balance -= amount; // 从玩家余额中扣除下注金额
    this.betAmount += amount; // 将下注金额累加到总下注金额中
  }

  dealCard() {  // 发牌
    if (this.deck.length === 0) { // 如果牌堆中没有牌
      throw new Error('No cards left in deck.');  // 抛出错误
    } else if (this.state !== 'betting') { // 如果游戏状态不是下注状态
      throw new Error('Invalid game state.'); // 抛出错误
    } else if (this.players.every((p) => p.standing)) { // 如果所有玩家都已经停牌
      throw new Error('All players stood.'); // 抛出错误
    } else if (this.players.every((p) => p.hand.length > 0)) { // 如果所有玩家都已经拿过牌
      throw new Error('All players dealt.'); // 抛出错误
    }

    return this.deck.pop(); // 从牌堆中取出一张牌
  }

  shuffleDeck() { // 洗牌
    // 洗牌逻辑

    this.deck = [ // 生成一副牌
      new Card('A', '♠'),
      new Card('2', '♠'),
      new Card('3', '♠'),
      new Card('4', '♠'),
      new Card('5', '♠'),
      new Card('6', '♠'),
      new Card('7', '♠'),
      new Card('8', '♠'),
      new Card('9', '♠'),
      new Card('10', '♠'),
      new Card('J', '♠'),
      new Card('Q', '♠'),
      new Card('K', '♠'),
      new Card('A', '♥'),
      new Card('2', '♥'),
      new Card('3', '♥'),
      new Card('4', '♥'),
      new Card('5', '♥'),
      new Card('6', '♥'),
      new Card('7', '♥'),
      new Card('8', '♥'),
      new Card('9', '♥'),
      new Card('10', '♥'),
      new Card('J', '♥'),
      new Card('Q', '♥'),
      new Card('K', '♥'),
      new Card('A', '♣'),
      new Card('2', '♣'),
      new Card('3', '♣'),
      new Card('4', '♣'),
      new Card('5', '♣'),
      new Card('6', '♣'),
      new Card('7', '♣'),
      new Card('8', '♣'),
      new Card('9', '♣'),
      new Card('10', '♣'),
      new Card('J', '♣'),
      new Card('Q', '♣'),
      new Card('K', '♣'),
      new Card('A', '♦'),
      new Card('2', '♦'),
      new Card('3', '♦'),
      new Card('4', '♦'),
      new Card('5', '♦'),
      new Card('6', '♦'),
      new Card('7', '♦'),
      new Card('8', '♦'),
      new Card('9', '♦'),
      new Card('10', '♦'),
      new Card('J', '♦'),
      new Card('Q', '♦'),
      new Card('K', '♦'),
    ];

    this.deck = this.deck.sort(() => Math.random() - 0.5); // 随机排序

    this.state = 'betting'; // 将游戏状态设置为下注状态

    this.betAmount = 0; // 将总下注金额设置为0

    this.players.forEach((p) => { // 遍历所有玩家
      p.hand = []; // 将玩家手牌设置为空数组
      p.standing = false; // 将玩家停牌状态设置为false
    });

    this.dealer.hand = []; // 将庄家手牌设置为空数组
    this.dealer.standing = false; // 将庄家停牌状态设置为false

    this.players.forEach((p) => { // 遍历所有玩家
      p.addCard(this.dealCard()); // 给玩家发一张牌
    });

    this.dealer.addCard(this.dealCard()); // 给庄家发一张牌

    this.players.forEach((p) => { // 遍历所有玩家
      p.addCard(this.dealCard()); // 给玩家发一张牌
    });

    this.dealer.addCard(this.dealCard()); // 给庄家发一张牌

    this.state = 'playing'; // 将游戏状态设置为游戏状态

    return this.deck; // 返回牌堆

  }
}

class Card { // 牌类
  constructor(value, suit) {  // 构造函数
    this.value = value; // 牌面值
    this.suit = suit; // 花色
  }
}


class Player {  // 玩家类
  constructor(name, balance = 100) {  // 构造函数
    this.name = name; // 玩家姓名
    this.balance = balance; // 玩家余额
    this.hand = []; // 玩家手牌
    this.standing = false;  // 玩家停牌状态
  }

  addCard(card) { // 给玩家发牌
    this.hand.push(card); // 将牌加入玩家手牌中
  }

  stand() { // 玩家停牌
    this.standing = true; // 将玩家停牌状态设置为true
  }
}

export { Game, Player };
