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
            int pos = games.findOrAddGame(tableName);

            Clients.Caller.myPosition(pos);
            Clients.Others.displayPlayer(username, pos);
        }

        public void startGame(string tableName, List<int> currentHand)
        {
            Clients.All.startGame(currentHand, 0);
        }
    }
}