import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type TabType = 'home' | 'giveaways' | 'earn' | 'profile' | 'shop';

interface Giveaway {
  id: number;
  title: string;
  prize: string;
  cost: number;
  participants: number;
  maxParticipants: number;
  endTime: string;
  status: 'active' | 'ended';
}

interface ShopItem {
  id: number;
  name: string;
  description: string;
  cost: number;
  icon: string;
}

interface LeaderboardPlayer {
  id: number;
  name: string;
  wins: number;
  coins: number;
  avatar: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  reward: number;
  icon: string;
  type: 'daily' | 'bonus' | 'achievement';
  taskType: 'login' | 'giveaway' | 'play' | 'invite' | 'shop' | 'win' | 'streak' | 'level';
  progress?: number;
  maxProgress?: number;
  completed: boolean;
}

const Snowflake = ({ style }: { style: React.CSSProperties }) => {
  return <div className="snowflake" style={style}>❄</div>;
};

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [userCoins, setUserCoins] = useState(12500);
  const [userLevel, setUserLevel] = useState(7);
  const [userXP, setUserXP] = useState(2340);
  const [userWins, setUserWins] = useState(24);
  const [gamesPlayed, setGamesPlayed] = useState(127);
  const [giveawayJoins, setGiveawayJoins] = useState(0);
  const [shopPurchases, setShopPurchases] = useState(0);
  const [loginStreak, setLoginStreak] = useState(4);
  const [snowflakes, setSnowflakes] = useState<React.CSSProperties[]>([]);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: '🎄 Ежедневный вход', description: 'Заходи каждый день и получай награды', reward: 100, icon: 'Calendar', type: 'daily', taskType: 'login', completed: false },
    { id: 2, title: '⭐ Участвуй в 3 розыгрышах', description: 'Попробуй удачу в новогодних розыгрышах', reward: 250, icon: 'Gift', type: 'daily', taskType: 'giveaway', progress: 0, maxProgress: 3, completed: false },
    { id: 3, title: '🎮 Сыграй 5 игр', description: 'Играй и зарабатывай монеты', reward: 200, icon: 'Gamepad2', type: 'daily', taskType: 'play', progress: 0, maxProgress: 5, completed: false },
    { id: 4, title: '🎅 Пригласи друга', description: 'Получи бонус за каждого приглашенного друга', reward: 500, icon: 'Users', type: 'bonus', taskType: 'invite', completed: false },
    { id: 5, title: '💎 Купи предмет в магазине', description: 'Соверши первую покупку', reward: 300, icon: 'ShoppingCart', type: 'bonus', taskType: 'shop', completed: false },
    { id: 6, title: '🏆 Выиграй 100 раз', description: 'Стань чемпионом', reward: 1000, icon: 'Trophy', type: 'achievement', taskType: 'win', progress: 24, maxProgress: 100, completed: false },
    { id: 7, title: '⚡ Новогодняя серия', description: 'Войди в систему 7 дней подряд', reward: 750, icon: 'Zap', type: 'achievement', taskType: 'streak', progress: 4, maxProgress: 7, completed: false },
    { id: 8, title: '👑 Достигни уровня 10', description: 'Повышай свой уровень', reward: 2000, icon: 'Crown', type: 'achievement', taskType: 'level', progress: 7, maxProgress: 10, completed: false },
  ]);

  useEffect(() => {
    const flakes = Array.from({ length: 30 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 10 + 10}s`,
      animationDelay: `${Math.random() * 5}s`,
      fontSize: `${Math.random() * 1 + 0.5}em`,
    }));
    setSnowflakes(flakes);
  }, []);

  useEffect(() => {
    updateTaskProgress('giveaway', giveawayJoins);
  }, [giveawayJoins]);

  useEffect(() => {
    updateTaskProgress('shop', shopPurchases);
  }, [shopPurchases]);

  useEffect(() => {
    updateTaskProgress('win', userWins);
  }, [userWins]);

  useEffect(() => {
    updateTaskProgress('level', userLevel);
  }, [userLevel]);

  useEffect(() => {
    updateTaskProgress('streak', loginStreak);
  }, [loginStreak]);

  useEffect(() => {
    if (userXP >= 3600) {
      setUserLevel(userLevel + 1);
      setUserXP(userXP - 3600);
      toast({
        title: '🎉 Новый уровень!',
        description: `Поздравляем! Вы достигли уровня ${userLevel + 1}!`,
      });
    }
  }, [userXP]);

  const updateTaskProgress = (taskType: string, currentValue: number) => {
    setTasks(prevTasks => prevTasks.map(task => {
      if (task.taskType === taskType && task.maxProgress) {
        const newProgress = Math.min(currentValue, task.maxProgress);
        const isNowComplete = newProgress >= task.maxProgress && !task.completed;
        return { 
          ...task, 
          progress: newProgress,
          completed: isNowComplete || task.completed
        };
      }
      return task;
    }));
  };

  const giveaways: Giveaway[] = [
    { id: 1, title: '🎄 Новогодний Мега-Приз', prize: '10,000 монет', cost: 100, participants: 87, maxParticipants: 100, endTime: '2ч 15м', status: 'active' },
    { id: 2, title: '🎁 Рождественский VIP', prize: 'Premium статус', cost: 250, participants: 45, maxParticipants: 50, endTime: '5ч 30м', status: 'active' },
    { id: 3, title: '⭐ Зимний Буст', prize: 'x2 опыта', cost: 75, participants: 100, maxParticipants: 100, endTime: 'Завершен', status: 'ended' },
  ];

  const shopItems: ShopItem[] = [
    { id: 1, name: '🎅 Удача Деда Мороза', description: '+10% шанс выигрыша', cost: 500, icon: 'Sparkles' },
    { id: 2, name: '❄️ Морозные Монеты', description: 'x2 монет на 1 час', cost: 1000, icon: 'Coins' },
    { id: 3, name: '👑 Королевская Елка', description: 'VIP статус на неделю', cost: 2500, icon: 'Crown' },
    { id: 4, name: '⚡ Новогодняя Энергия', description: '+50 энергии', cost: 300, icon: 'Zap' },
  ];

  const leaderboard: LeaderboardPlayer[] = [
    { id: 1, name: 'СнежныйКороль', wins: 156, coins: 45000, avatar: '🎅' },
    { id: 2, name: 'МорознаяКоролева', wins: 143, coins: 42300, avatar: '❄️' },
    { id: 3, name: 'ЕлочныйГерой', wins: 128, coins: 38900, avatar: '🎄' },
    { id: 4, name: 'ЗвездаНовогода', wins: 115, coins: 35600, avatar: '⭐' },
    { id: 5, name: 'СчастливыйСнеговик', wins: 98, coins: 29800, avatar: '⛄' },
    { id: 6, name: 'РождествоПро', wins: 87, coins: 26500, avatar: '🎁' },
    { id: 7, name: 'НовогоднийПро_2025', wins: userWins, coins: userCoins, avatar: '🎮' },
    { id: 8, name: 'ОгненныйДракон', wins: 65, coins: 19800, avatar: '🐉' },
    { id: 9, name: 'МагияЗимы', wins: 54, coins: 16200, avatar: '✨' },
    { id: 10, name: 'НовогоднийГром', wins: 43, coins: 13100, avatar: '⚡' },
  ];

  const joinGiveaway = (cost: number, giveawayId: number) => {
    if (userCoins >= cost) {
      setUserCoins(userCoins - cost);
      setGiveawayJoins(giveawayJoins + 1);
      
      const isWin = Math.random() < 0.3;
      
      setTimeout(() => {
        if (isWin) {
          const winAmount = Math.floor(Math.random() * 500) + 200;
          setUserCoins(prev => prev + winAmount);
          setUserWins(userWins + 1);
          setUserXP(prev => prev + 150);
          toast({
            title: '🎉 Победа!',
            description: `Вы выиграли ${winAmount} монет!`,
          });
        } else {
          toast({
            title: '😔 Не повезло',
            description: 'Попробуйте еще раз! Удача на вашей стороне!',
          });
        }
        setGamesPlayed(prev => prev + 1);
      }, 1500);
    } else {
      toast({
        title: '❌ Недостаточно монет',
        description: `Нужно еще ${cost - userCoins} монет`,
        variant: 'destructive',
      });
    }
  };

  const buyItem = (cost: number, itemName: string) => {
    if (userCoins >= cost) {
      setUserCoins(userCoins - cost);
      setShopPurchases(shopPurchases + 1);
      setUserXP(prev => prev + 50);
      toast({
        title: '✅ Покупка совершена!',
        description: `Вы приобрели: ${itemName}`,
      });
    } else {
      toast({
        title: '❌ Недостаточно монет',
        description: `Нужно еще ${cost - userCoins} монет`,
        variant: 'destructive',
      });
    }
  };

  const completeTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    if (task.taskType === 'login' && !task.completed) {
      setUserCoins(userCoins + task.reward);
      setUserXP(prev => prev + 100);
      setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: true } : t));
      toast({
        title: '🎁 Награда получена!',
        description: `+${task.reward} монет за ежедневный вход!`,
      });
    }

    if (task.taskType === 'invite') {
      toast({
        title: '👥 Пригласи друзей',
        description: 'Функция приглашения появится в следующем обновлении!',
      });
    }

    if (task.maxProgress && task.progress! >= task.maxProgress && !task.completed) {
      setUserCoins(userCoins + task.reward);
      setUserXP(prev => prev + 200);
      setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: true } : t));
      toast({
        title: '🏆 Задание выполнено!',
        description: `+${task.reward} монет!`,
      });
    }
  };

  const xpToNextLevel = 3600;
  const xpProgress = (userXP / xpToNextLevel) * 100;
  const currentRank = leaderboard.findIndex(p => p.name === 'НовогоднийПро_2025') + 1;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 relative overflow-hidden">
      {snowflakes.map((style, i) => (
        <Snowflake key={i} style={style} />
      ))}
      
      <div className="christmas-lights"></div>
      
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-bg bg-clip-text text-transparent flex items-center gap-3">
              🎄 НОВОГОДНИЕ ИГРЫ 🎄
            </h1>
            <p className="text-muted-foreground mt-1">Играй, выигрывай, празднуй Новый Год! ✨</p>
          </div>
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary animate-glow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="text-4xl">🪙</div>
              <div>
                <p className="text-sm text-muted-foreground">Баланс</p>
                <p className="text-2xl font-bold text-primary">{userCoins.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </header>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabType)} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm border-2 border-secondary/30">
            <TabsTrigger value="home" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Icon name="Home" size={20} className="mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="giveaways" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Icon name="Gift" size={20} className="mr-2" />
              Розыгрыши
            </TabsTrigger>
            <TabsTrigger value="earn" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Icon name="Coins" size={20} className="mr-2" />
              Заработок
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Icon name="User" size={20} className="mr-2" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="shop" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Icon name="ShoppingBag" size={20} className="mr-2" />
              Магазин
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6 animate-scale-in">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-red-600/20 to-green-600/20 border-2 border-primary/50 hover:scale-105 transition-transform cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-3xl">🏆</span>
                    Побед
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-primary">{userWins}</p>
                  <p className="text-sm text-muted-foreground mt-2">Всего новогодних выигрышей</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-2 border-accent/50 hover:scale-105 transition-transform cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-3xl">⭐</span>
                    Уровень
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-accent">{userLevel}</p>
                  <Progress value={xpProgress} className="mt-3 bg-muted" />
                  <p className="text-sm text-muted-foreground mt-2">{Math.floor(xpProgress)}% до уровня {userLevel + 1}</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-600/20 to-yellow-600/20 border-2 border-secondary/50 hover:scale-105 transition-transform cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-3xl">🎄</span>
                    Рейтинг
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-secondary">#{currentRank}</p>
                  <p className="text-sm text-muted-foreground mt-2">В топе праздничных игроков</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-secondary neon-glow-pink">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <span className="text-3xl">🎅</span>
                  Топ-10 Новогодних Лидеров
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {leaderboard.sort((a, b) => b.wins - a.wins).slice(0, 10).map((player, index) => (
                    <div
                      key={player.id}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all hover:scale-[1.02] ${
                        player.name === 'НовогоднийПро_2025'
                          ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-2 border-blue-500/70 shadow-xl'
                          : index < 3
                          ? 'bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border-2 border-yellow-500/50 shadow-lg'
                          : 'bg-card/70 border border-border/30'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`text-2xl font-bold ${index < 3 ? 'text-yellow-400' : 'text-muted-foreground'}`}>
                          #{index + 1}
                        </div>
                        <div className="text-4xl">{player.avatar}</div>
                        <div>
                          <p className="font-semibold text-lg">{player.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <span className="text-lg">🏆</span> {player.wins} побед
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary text-xl flex items-center gap-2">
                          <span className="text-2xl">🪙</span>
                          {player.coins.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="giveaways" className="space-y-4 animate-scale-in">
            <div className="grid md:grid-cols-2 gap-4">
              {giveaways.map((giveaway) => (
                <Card
                  key={giveaway.id}
                  className={`border-2 ${
                    giveaway.status === 'active'
                      ? 'border-secondary hover:shadow-2xl hover:shadow-secondary/50 transition-all cursor-pointer'
                      : 'opacity-60 border-muted'
                  }`}
                >
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{giveaway.title}</CardTitle>
                      <Badge variant={giveaway.status === 'active' ? 'default' : 'secondary'} className="text-sm">
                        {giveaway.status === 'active' ? '✨ Активен' : '❌ Завершен'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                        <span className="text-muted-foreground">Приз:</span>
                        <span className="font-bold text-secondary text-lg">{giveaway.prize}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                        <span className="text-muted-foreground">Стоимость входа:</span>
                        <span className="font-bold text-primary flex items-center gap-1 text-lg">
                          🪙 {giveaway.cost}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                        <span className="text-muted-foreground">Участников:</span>
                        <span className="font-bold text-lg">
                          {giveaway.participants}/{giveaway.maxParticipants}
                        </span>
                      </div>
                      <Progress value={(giveaway.participants / giveaway.maxParticipants) * 100} className="h-3" />
                    </div>
                    {giveaway.status === 'active' && (
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 text-accent">
                          <Icon name="Clock" size={18} />
                          <span className="text-sm font-semibold">⏱️ {giveaway.endTime}</span>
                        </div>
                        <Button
                          onClick={() => joinGiveaway(giveaway.cost, giveaway.id)}
                          disabled={userCoins < giveaway.cost}
                          className="bg-primary hover:bg-primary/80 neon-glow font-bold"
                        >
                          🎁 Участвовать
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="earn" className="space-y-6 animate-scale-in">
            <Card className="border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-600/10 to-orange-600/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <span className="text-4xl">🎁</span>
                  Зарабатывай монеты каждый день!
                </CardTitle>
                <p className="text-muted-foreground mt-2">Выполняй задания и получай новогодние награды</p>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">📅</span> Ежедневные задания
                </h3>
                <div className="grid gap-4">
                  {tasks.filter(t => t.type === 'daily').map((task) => (
                    <Card key={task.id} className={`border-2 transition-all ${
                      task.completed 
                        ? 'border-green-500/50 bg-green-600/10 opacity-75' 
                        : 'border-primary/50 hover:shadow-lg hover:shadow-primary/20'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
                              task.completed
                                ? 'bg-green-600/30'
                                : 'bg-gradient-to-br from-red-600/30 to-green-600/30'
                            }`}>
                              <Icon name={task.icon as any} size={28} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-lg mb-1">{task.title}</h4>
                              <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                              {task.maxProgress && (
                                <div className="space-y-1">
                                  <Progress value={(task.progress! / task.maxProgress) * 100} className="h-2" />
                                  <p className="text-xs text-muted-foreground">{task.progress}/{task.maxProgress}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-3">
                            <div className="flex items-center gap-2 text-xl font-bold text-yellow-400">
                              <span className="text-2xl">🪙</span>
                              +{task.reward}
                            </div>
                            {task.completed ? (
                              <Badge className="bg-green-600 text-white">✓ Выполнено</Badge>
                            ) : (
                              <Button
                                onClick={() => completeTask(task.id)}
                                disabled={task.maxProgress ? task.progress! < task.maxProgress : false}
                                className="bg-primary hover:bg-primary/80 font-bold"
                              >
                                Забрать
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">🎁</span> Бонусные задания
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {tasks.filter(t => t.type === 'bonus').map((task) => (
                    <Card key={task.id} className={`border-2 transition-all ${
                      task.completed 
                        ? 'border-green-500/50 bg-green-600/10 opacity-75' 
                        : 'border-secondary/50 hover:shadow-lg hover:shadow-secondary/20'
                    }`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                              task.completed
                                ? 'bg-green-600/30'
                                : 'bg-gradient-to-br from-blue-600/30 to-purple-600/30'
                            }`}>
                              <Icon name={task.icon as any} size={24} />
                            </div>
                            <CardTitle className="text-lg">{task.title}</CardTitle>
                          </div>
                          {task.completed && <Badge className="bg-green-600 text-white">✓</Badge>}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-lg font-bold text-yellow-400">
                            <span className="text-2xl">🪙</span>
                            +{task.reward}
                          </div>
                          {!task.completed && (
                            <Button
                              onClick={() => completeTask(task.id)}
                              className="bg-secondary hover:bg-secondary/80 font-bold"
                            >
                              Выполнить
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏆</span> Достижения
                </h3>
                <div className="grid gap-4">
                  {tasks.filter(t => t.type === 'achievement').map((task) => (
                    <Card key={task.id} className={`border-2 transition-all ${
                      task.completed 
                        ? 'border-green-500/50 bg-green-600/10 opacity-75' 
                        : 'border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/20'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
                              task.completed
                                ? 'bg-green-600/30'
                                : 'bg-gradient-to-br from-yellow-600/30 to-orange-600/30'
                            }`}>
                              <Icon name={task.icon as any} size={28} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-lg mb-1">{task.title}</h4>
                              <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                              {task.maxProgress && (
                                <div className="space-y-1">
                                  <Progress value={(task.progress! / task.maxProgress) * 100} className="h-2" />
                                  <p className="text-xs text-muted-foreground">{task.progress}/{task.maxProgress}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-3">
                            <div className="flex items-center gap-2 text-xl font-bold text-yellow-400">
                              <span className="text-2xl">🪙</span>
                              +{task.reward}
                            </div>
                            {task.completed ? (
                              <Badge className="bg-green-600 text-white text-sm">✓ Получено</Badge>
                            ) : task.maxProgress && task.progress! >= task.maxProgress ? (
                              <Button
                                onClick={() => completeTask(task.id)}
                                className="bg-yellow-500 hover:bg-yellow-600 font-bold"
                              >
                                Забрать
                              </Button>
                            ) : null}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="animate-scale-in">
            <Card className="border-2 border-secondary neon-border">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-green-600 flex items-center justify-center text-5xl animate-glow border-4 border-secondary">
                    🎅
                  </div>
                  <div>
                    <CardTitle className="text-3xl">НовогоднийПро_2025</CardTitle>
                    <p className="text-muted-foreground mt-1">🎄 Уровень {userLevel} • Член с декабря 2024</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-xl flex items-center gap-2">
                      📊 Статистика
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between p-3 bg-muted/30 rounded-lg border border-border/30">
                        <span className="text-muted-foreground">Всего игр:</span>
                        <span className="font-bold text-lg">{gamesPlayed}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gradient-to-r from-green-600/20 to-green-600/10 rounded-lg border border-secondary/30">
                        <span className="text-muted-foreground">Выиграно:</span>
                        <span className="font-bold text-secondary text-lg">🏆 {userWins}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted/30 rounded-lg border border-border/30">
                        <span className="text-muted-foreground">Процент побед:</span>
                        <span className="font-bold text-primary text-lg">{gamesPlayed > 0 ? ((userWins / gamesPlayed) * 100).toFixed(1) : 0}%</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gradient-to-r from-yellow-600/20 to-yellow-600/10 rounded-lg border border-yellow-500/30">
                        <span className="text-muted-foreground">Баланс:</span>
                        <span className="font-bold text-yellow-400 text-lg">🪙 {userCoins.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-xl flex items-center gap-2">
                      🏅 Достижения
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {['🏆', '⭐', '💎', '🎄', '⚡', '🎅'].map((emoji, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-lg bg-gradient-to-br from-red-600/20 to-green-600/20 border-2 border-secondary/40 flex items-center justify-center text-4xl hover:scale-110 hover:border-secondary transition-all cursor-pointer shadow-lg"
                        >
                          {emoji}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-secondary/30 pt-6">
                  <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
                    📈 Прогресс уровня
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-primary">🎄 Уровень {userLevel}</span>
                      <span className="text-secondary">🎁 Уровень {userLevel + 1}</span>
                    </div>
                    <Progress value={xpProgress} className="h-4 border border-secondary/30" />
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="text-lg">⭐</span> {userXP.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shop" className="animate-scale-in">
            <div className="grid md:grid-cols-2 gap-4">
              {shopItems.map((item) => (
                <Card key={item.id} className="border-2 border-secondary hover:shadow-2xl hover:shadow-secondary/30 transition-all">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-green-600 flex items-center justify-center shadow-lg">
                        <Icon name={item.icon as any} size={28} className="text-white" />
                      </div>
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <p className="text-muted-foreground text-base">{item.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                        <span className="text-3xl">🪙</span>
                        {item.cost.toLocaleString()}
                      </div>
                      <Button
                        onClick={() => buyItem(item.cost, item.name)}
                        disabled={userCoins < item.cost}
                        className="bg-secondary hover:bg-secondary/80 neon-glow-pink font-bold text-base px-6"
                      >
                        🛒 Купить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
