using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Business.DomainModel;
using Business;
using Poker.Controllers;

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
        public int stakesMoney { get; set; }
        public int pileNumber { get; set; }
        public Card card1 { get; set; }
        public Card card2 { get; set; }
    }

    public class Game
    {
        public string Name { get; private set; }
        public Table table { get; private set; }
        public int FreeSeats { get; set; }
        public IDictionary<int, Player> Players { get; set; }
        public bool[] UsedSeats { get; set; }
        public List<int> CurrentHand { get; set; }
        public int currentPlayer { get; set; }
        public List<int> piles { get; set; }
        public int lastRasePlayer { get; set; }
        public int currentRase { get; set; }
        public List<Card> deck { get; set; }
        public List<Card> cardsOnTable { get; set; }
        public Command CurrentCommand { get; set; }
        public int numOfHands { get; set; }

        public Game(string name)
        {
            Name = name;
            FreeSeats = 8;
            Players = new Dictionary<int, Player>();
            UsedSeats = new bool[8];
            CurrentHand = new List<int>();
            //deck = shuffle();
            piles = new List<int>();
            cardsOnTable = new List<Card>();
            UserRepository rep = new UserRepository();
            table = rep.ReadTable(name);
            numOfHands = 0;
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

        public int addPlayer(string username)
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

            UserRepository rep = new UserRepository();
            User user = rep.ReadByUsername(username);
            Player playerAdd = new Player()
            {
                username = username,
                currentMoney = ((user.money > table.BuyInMax)? table.BuyInMax : table.BuyInMin),
                pileNumber = 0,
                stakesMoney = 0
            };
            Players.Add(i, playerAdd);
            FreeSeats--;

            return i;
        }

        public void newHand()
        {
            numOfHands = (numOfHands + 1) % Players.Count;
            piles.Clear();
            piles.Add(0);
            lastRasePlayer = 0;
            deck = shuffle();
            cardsOnTable.Clear();

            CurrentHand.Clear();
            foreach (KeyValuePair<int, Player> player in Players)
            {
                CurrentHand.Add(player.Key);
            }

            for (int j = 0; j < numOfHands; j++)
            {
                int tmp = CurrentHand[0];
                for (int i = 0; i < CurrentHand.Count - 1; i++)
                    CurrentHand[i] = CurrentHand[i + 1];
                CurrentHand[CurrentHand.Count - 1] = tmp;
            }

            currentPlayer = (0 - 3) % CurrentHand.Count;
        }

        public void endCircle() 
        {
            if (cardsOnTable.Count == 0)
            {
                cardsOnTable.Add(deck[deck.Count - 1]);
                deck.RemoveAt(deck.Count - 1);
                cardsOnTable.Add(deck[deck.Count - 1]);
                deck.RemoveAt(deck.Count - 1);
                cardsOnTable.Add(deck[deck.Count - 1]);
                deck.RemoveAt(deck.Count - 1);
            }
            else if (cardsOnTable.Count == 3)
            {
                cardsOnTable.Add(deck[deck.Count - 1]);
                deck.RemoveAt(deck.Count - 1);
            }
            else if (cardsOnTable.Count == 4)
            {
                cardsOnTable.Add(deck[deck.Count - 1]);
                deck.RemoveAt(deck.Count - 1);
            }
        }

        public int WhoIsWinner()
        {

        }
    }
}