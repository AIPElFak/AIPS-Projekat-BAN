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
        }

        public void startGame(string tableName, List<int> currentHand)
        {
            Clients.All.startGame(currentHand, 0);
        }

        public void newHand(string tableName)
        {
            games.listOfGames[tableName].newHand();
        }

        public void play(string tableName, int position, string command, int money)
        {
            games.listOfGames[tableName].CurrentCommand = Command.makeCommand(games.listOfGames[tableName], command, money);
            games.listOfGames[tableName].CurrentCommand.Execute(position);
        }

        public void sendCards(Card card1, Card card2, int pos)
        {
            Clients.All.getCards(card1.getString(), card2.getString(), pos);
        }

        public void smallBlind(int money, int pos)
        {
            Clients.All.showSmallBlind(money, pos);
        }

        public void bigBlind(int money, int pos)
        {
            Clients.All.showBigBlind(money, pos);
        }

        public void askPlayer(int pos)
        {
            Clients.All.askMe(pos);
        }
    }
}