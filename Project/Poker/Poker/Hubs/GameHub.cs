using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Poker.Hubs
{
    public class GameHub : Hub
    {
        private Games games;

        public GameHub()
        {
            games = Games.Instance;
        }
    
        public void enterGame(string username, string tableName)
        {
            int pos = games.findOrAddGame(tableName, username);
            Game game = games.listOfGames[tableName];
            game.Players[pos].connectionId = Context.ConnectionId;

            Groups.Add(Context.ConnectionId, tableName);

            Clients.Caller.myPosition(username, pos, game.Players[pos].currentMoney);

            foreach (KeyValuePair<int, Player> player in game.Players)
            {
                if (player.Key != pos)
                {
                    Clients.Caller.otherPlayers(player.Value.username, player.Key, player.Value.currentMoney);
                }
            }

            Clients.OthersInGroup(tableName).displayPlayer(username, pos, game.Players[pos].currentMoney);

            if (game.Players.Count == 2)
            {
                game.newHand();
                game.currentPlayer = 1;
                playDeal(game.Name);
            }
        }

        public void playDeal(string tableName)
        {
            Game game = games.listOfGames[tableName];
            game.CurrentCommand = Command.makeCommand(games.listOfGames[tableName], "deal", 0);
            game.CurrentCommand.Execute();

            Clients.Group(game.Name).resetTable();

            foreach (int pos in game.CurrentHand)
            {
                Clients.Group(game.Name).getCards(game.Players[pos].card1.getString(), game.Players[pos].card2.getString(), pos);
            }

            game.currentPlayer = (game.currentPlayer + 1) % game.CurrentHand.Count;
            playSmallBlind(game.Name);
        }

        public void playSmallBlind(string tableName)
        {
            Game game = games.listOfGames[tableName];
            game.CurrentCommand = Command.makeCommand(games.listOfGames[tableName], "smallBlind", 0);
            game.CurrentCommand.Execute();

            Clients.Group(game.Name).showSmallBlind(game.table.smallBlind, game.CurrentHand[game.currentPlayer]);

            game.currentPlayer = (game.currentPlayer + 1) % game.CurrentHand.Count;
            playBigBlind(game.Name);
        }

        public void playBigBlind(string tableName)
        {
            Game game = games.listOfGames[tableName];
            game.CurrentCommand = Command.makeCommand(games.listOfGames[tableName], "bigBlind", 0);
            game.CurrentCommand.Execute();

            Clients.Group(game.Name).showBigBlind(game.table.bigBlind, game.CurrentHand[game.currentPlayer]);

            game.lastRasePlayer = game.currentPlayer;
            game.currentPlayer = (game.currentPlayer + 1) % game.CurrentHand.Count;
            Clients.Caller.youAreNext(game.CurrentHand[game.currentPlayer], game.table.bigBlind, game.table.bigBlind);
        }

        public void play(int result, string tableName)
        {
            Game game = games.listOfGames[tableName];

            if (result == -1)
                game.CurrentCommand = Command.makeCommand(games.listOfGames[tableName], "fold", 0);
            else if (result == 0)
                game.CurrentCommand = Command.makeCommand(games.listOfGames[tableName], "check", 0);
            else
                game.CurrentCommand = Command.makeCommand(games.listOfGames[tableName], "raise", result);

            game.CurrentCommand.Execute();

            Clients.OthersInGroup(game.Name).displayPlayed(game.CurrentHand[game.currentPlayer], 
                                            game.currentRaise - game.Players[game.CurrentHand[game.currentPlayer]].stakesMoney);

            game.currentPlayer = (game.currentPlayer + 1) % game.CurrentHand.Count;

            if (game.currentPlayer != game.lastRasePlayer)
            {
                Clients.Group(game.Name).youAreNext(game.CurrentHand[game.currentPlayer],
                    game.currentRaise - game.Players[game.CurrentHand[game.currentPlayer]].stakesMoney, game.table.bigBlind);
            }
            else
            {
                if (game.cardsOnTable.Count == 5)
                {
                    int winner = game.WhoIsWinner();
                    Clients.Group(game.Name).showWinner(winner);
                    game.SetWinning(winner);

                    game.newHand();
                    playDeal(game.Name);
                    return;
                }

                game.endCircle();
                game.lastRasePlayer = game.currentPlayer;

                List<string> cards = new List<string>();
                for (int i = 0; i < game.cardsOnTable.Count; i++)
                    cards.Add(game.cardsOnTable[i].getString());

                Clients.Group(game.Name).displayCardsOnTable(game.CurrentHand[game.currentPlayer], cards);
                Clients.Group(game.Name).youAreNext(game.CurrentHand[game.currentPlayer],
                    game.currentRaise - game.Players[game.CurrentHand[game.currentPlayer]].stakesMoney, game.table.bigBlind);
          
            }
        }
    }
}