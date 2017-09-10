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

            Clients.Caller.myPosition(username, pos, game.Players[pos].currentMoney);

            foreach (KeyValuePair<int, Player> player in game.Players)
            {
                if (player.Key != pos)
                {
                    Clients.Caller.otherPlayers(player.Value.username, player.Key, player.Value.currentMoney);
                }
            }

            Clients.Others.displayPlayer(username, pos, game.Players[pos].currentMoney);

            if (game.Players.Count == 2)
            {
                game.newHand();
                playDeal(game.Name);
            }
        }

        public void playDeal(string tableName)
        {
            Game game = games.listOfGames[tableName];
            game.CurrentCommand = Command.makeCommand(games.listOfGames[tableName], "deal", 0);
            game.CurrentCommand.Execute();

            foreach (int pos in game.CurrentHand)
            {
                Clients.All.getCards(game.Players[pos].card1.getString(), game.Players[pos].card2.getString(), pos);
            }

            game.currentPlayer = (game.currentPlayer + 1) % game.CurrentHand.Count;
            playSmallBlind(game.Name);
        }

        public void playSmallBlind(string tableName)
        {
            Game game = games.listOfGames[tableName];
            game.CurrentCommand = Command.makeCommand(games.listOfGames[tableName], "smallBlind", 0);
            game.CurrentCommand.Execute();

            Clients.All.showSmallBlind(game.table.smallBlind, game.CurrentHand[game.currentPlayer]);

            game.currentPlayer = (game.currentPlayer + 1) % game.CurrentHand.Count;
            playBigBlind(game.Name);
        }

        public void playBigBlind(string tableName)
        {
            Game game = games.listOfGames[tableName];
            game.CurrentCommand = Command.makeCommand(games.listOfGames[tableName], "bigBlind", 0);
            game.CurrentCommand.Execute();

            Clients.All.showBigBlind(game.table.bigBlind, game.CurrentHand[game.currentPlayer]);

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

            Clients.Others.displayPlayed(game.CurrentHand[game.currentPlayer], 
                                            game.currentRase - game.Players[game.CurrentHand[game.currentPlayer]].stakesMoney);

            game.currentPlayer = (game.currentPlayer + 1) % game.CurrentHand.Count;

            if (game.currentPlayer != game.lastRasePlayer)
                Clients.All.youAreNext(game.CurrentHand[game.currentPlayer], 
                    game.currentRase - game.Players[game.CurrentHand[game.currentPlayer]].stakesMoney, game.table.bigBlind);
            else
            {
                game.endCircle();
                game.lastRasePlayer = game.currentPlayer - 1;
                if (game.cardsOnTable.Count == 5)
                {
                    int winner = game.WhoIsWinner();
                    Clients.All.showWinner(winner);

                    game.newHand();
                    playDeal(game.Name);
                }
                else
                {
                    List<string> cards = new List<string>();
                    for (int i = 0; i < game.cardsOnTable.Count; i++)
                        cards.Add(game.cardsOnTable[i].getString());

                    Clients.All.displayCardsOnTable(cards);
                    Clients.All.youAreNext(game.CurrentHand[game.currentPlayer],
                        game.currentRase - game.Players[game.CurrentHand[game.currentPlayer]].stakesMoney, game.table.bigBlind);
                }
            }
        }
    }
}