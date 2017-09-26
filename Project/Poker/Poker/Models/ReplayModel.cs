using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Business.DomainModel;
using Business;

namespace Poker.Models
{
    public class ReplayModel
    {
        string username { get; set; }
        public Hand hand { get; set; }
        public void Load(string username)
        {
            UserRepository u = new UserRepository();
            this.hand = u.ReadHand(username);
            this.username = username;    
        }
    }
}