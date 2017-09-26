using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Business;
using Business.DomainModel;

namespace Poker.Models
{
    public class HomeModel
    {
        public string money { get; set; }
        public string username { get; set; }
        public string avatarURL { get; set; }
        public int winnings { get; set; }

        public void Load(string username)
        {
            UserRepository u = new UserRepository();
            User user = new User();
            user = u.ReadByUsername(username);
            this.money = user.money.ToString();
            this.username = username;
            this.avatarURL = user.avatarURL;
            this.winnings = user.bestWinnings;
        }
    }
}