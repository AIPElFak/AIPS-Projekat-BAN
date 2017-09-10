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

            Clients.Caller.myPosition(pos);
            Clients.Others.displayPlayer(username, pos);

            Game game = games.listOfGames[tableName];
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
            int a = 3;
        }

    }
}