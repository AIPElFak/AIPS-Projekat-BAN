using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Business;

namespace Poker.Models
{
    public class HomeModel
    {
        public string money { get; set; }
        public string username { get; set; }
        public string avatarURL { get; set; }

        public void Load(string username)
        {
            UserRepository user = new UserRepository();
            this.money = user.ReadByUsername(username).money.ToString();
            this.username = username;
            this.avatarURL = user.ReadByUsername(username).avatarURL;
        }
    }
}