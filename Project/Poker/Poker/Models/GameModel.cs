using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Business;

namespace Poker.Models
{
    public class GameModel
    {
        public int money { get; set; }
        public string username { get; set; }
        public int smallBlind { get; set; }
        public int bigBlind { get; set; }
        public int buyIn { get; set; }
        public string gameName { get; set; }

        public void Load(string username, string smallblind,string bigblind, string buyinmin, string buyinmax)
        {
            UserRepository user = new UserRepository();
            this.money = user.ReadByUsername(username).Money;
            this.username = username;

            this.smallBlind = Int32.Parse(smallblind);
            this.bigBlind = Int32.Parse(bigblind);

            int min = Int32.Parse(buyinmin);
            int max = Int32.Parse(buyinmax);

            if (money > max)
                this.buyIn = max;
            else
                this.buyIn = min;
        }
    }
}