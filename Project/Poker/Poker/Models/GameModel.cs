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

        public void Load(string username, string smallblind,string bigblind, string buyinmin, string buyinmax)
        {
            UserRepository user = new UserRepository();
            int mon = user.ReadByUsername(username).money;
            this.username = username;

            this.smallBlind = Int32.Parse(smallblind);
            this.bigBlind = Int32.Parse(bigblind);

            int min = Int32.Parse(buyinmin);
            int max = Int32.Parse(buyinmax);

            if (mon > max)
                this.buyIn = max;
            else
                this.buyIn = min;
            this.money = buyIn;

            user.UpdateMoney(username, mon - this.money);
        }
    }
}