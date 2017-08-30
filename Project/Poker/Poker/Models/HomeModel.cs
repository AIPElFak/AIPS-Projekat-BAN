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
        //ubaciti sliku (avatar)
        public void Load(string username)
        {
            UserRepository user = new UserRepository();
            this.money = user.ReadByUsername(username).Money.ToString();
            this.username = username;
        }
    }
}