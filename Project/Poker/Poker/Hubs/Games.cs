using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Poker.Hubs
{
    public class Games
    {
        private static Games _instance;

        public Dictionary<string, Game> listOfGames;

        private Games()
        {
            listOfGames = new Dictionary<string, Game>();
        }
        public static Games Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new Games();

                return _instance;
            }
        }

        public int findOrAddGame(string name, string username)
        {
            Game game;
            if (listOfGames.TryGetValue(name, out game))
            {
                return game.addPlayer(username);
            }
            else
            {
                game = new Game(name);
                listOfGames.Add(name, game);
                return listOfGames[name].addPlayer(username);
            }
        }
    }
}