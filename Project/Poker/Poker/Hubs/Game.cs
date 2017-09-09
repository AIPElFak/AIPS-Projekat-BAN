using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Business.DomainModel;
using Business;

namespace Poker.Hubs
{
    public class Card
    {
        public int number { get; set; }
        public int sign { get; set; }

        public string getString()
        {
            string retVal = "";

            switch (number)
            {
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                    retVal = number.ToString();
                    break;
                case 11:
                    retVal = "jack";
                    break;
                case 12:
                    retVal = "queen";
                    break;
                case 13:
                    retVal = "king";
                    break;
                case 1:
                    retVal = "ace";
                    break;
            }

            retVal += "_of_";

            switch (sign)
            {
                case 1:
                    retVal += "clubs";
                    break;
                case 2:
                    retVal += "diamonds";
                    break;
                case 3:
                    retVal += "hearts";
                    break;
                case 4:
                    retVal += "spades";
                    break;
            }

            return retVal;
        }
    }

    public class Player
    {
        public string username { get; set; }
        public int currentMoney { get; set; }
        public int pileNumber { get; set; }
    }

    public class Game
    {
        public string Name { get; private set; }
        public Table table { get; private set; }
        public int FreeSeats { get; set; }
        public IDictionary<int, Player> Players { get; set; }
        public bool[] UsedSeats { get; set; }
        public List<int> CurrentHand { get; set; }
        public List<int> piles { get; set; }
        public int lastRase { get; set; }
        public List<Card> deck { get; set; }
        public List<Command> startCommands { get; set; }

        public Game(string name)
        {
            Name = name;
            FreeSeats = 8;
            Players = new Dictionary<int, Player>();
            UsedSeats = new bool[8];
            CurrentHand = new List<int>();
            deck = shuffle();
            piles = new List<int>();
            startCommands = new List<Command>();
            UserRepository rep = new UserRepository();
            Table table = rep.ReadTable(name);
        }

        public List<Card> shuffle()
        {
            List<Card> cards = new List<Card>();

            for (int i = 1; i <= 13; i++)
                for (int j = 1; j <= 4; j++)
                    cards.Add(new Card() { number = i, sign = j });

            Random rnd = new Random(DateTime.Now.Millisecond);
            for (int i = cards.Count - 1; i > 0; i--)
            {
                int pos = rnd.Next(i);
                Card x = cards[i - 1];
                cards[i - 1] = cards[pos];
                cards[pos] = x;
            }

            return cards;
        }

        public int addPlayer()
        {
            if (FreeSeats == 0)
                return -1;

            int i = 0;
            for (i = 0; i < 8; i++)
                if (UsedSeats[i] == false)
                {
                    UsedSeats[i] = true;
                    break;
                }

            Player playerAdd = new Player()
            {
                username = (string)HttpContext.Current.Session["username"],
                currentMoney = (int)HttpContext.Current.Session["money"],
                pileNumber = 0
            };
            Players.Add(i, playerAdd);
            FreeSeats--;

            if (Players.Count == 2)
            {
                GameHub hub = new GameHub();
                foreach (KeyValuePair<int, Player> player in Players)
                {
                    CurrentHand.Add(player.Key);
                }
                piles.Add(0);
                lastRase = 0;
                startCommands.Clear();
                startCommands.Add(new Deal());
                startCommands.Add(new SmallBind());
                startCommands.Add(new BigBind());
                hub.startGame(Name, CurrentHand);
            }

            return i;
        }


    }
}