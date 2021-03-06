﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Business.DomainModel;
using Business;
using Poker.Controllers;
using HoldemHand;

namespace Poker.Hubs
{
    public class Player
    {
        public string username { get; set; }
        public string avatar { get; set; }
        public string connectionId { get; set; }
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
        public int currentRaise { get; set; }
        public List<Card> deck { get; set; }
        public List<Card> cardsOnTable { get; set; }
        public Command CurrentCommand { get; set; }
        public int numOfHands { get; set; }
        public Business.DomainModel.Hand Hand { get; set; }
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
            for (int i = cards.Count; i > 0; i--)
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
                avatar = user.avatarURL,
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
            currentRaise = 0;
            deck = shuffle();
            cardsOnTable.Clear();

            CurrentHand.Clear();

            Hand = new Business.DomainModel.Hand();
            
            foreach (KeyValuePair<int, Player> player in Players)
            {
                if (player.Value.currentMoney < this.table.BuyInMin)
                {
                    UserRepository rep = new UserRepository();
                    User user = rep.ReadByUsername(player.Value.username);

                    if (user.money >= table.BuyInMax)
                    {
                        player.Value.currentMoney += table.BuyInMax;
                        user.money -= table.BuyInMax;
                        rep.UpdateMoney(user.username, user.money);
                    }
                    else if (user.money > table.BuyInMin)
                    {
                        player.Value.currentMoney += table.BuyInMin;
                        user.money -= table.BuyInMin;
                        rep.UpdateMoney(user.username, user.money);
                    }
                    else
                    {
                        continue;
                    }
                }

                player.Value.stakesMoney = 0;
                CurrentHand.Add(player.Key);
                
                Hand.username.Add(player.Key.ToString(), player.Value.username);
            }
            
            //for (int j = 0; j < numOfHands; j++)
            //{
            //    int tmp = CurrentHand[0];
            //    for (int i = 0; i < CurrentHand.Count - 1; i++)
            //        CurrentHand[i] = CurrentHand[i + 1];
            //    CurrentHand[CurrentHand.Count - 1] = tmp;
            //}
        }

        public void endCircle() 
        {
            if (cardsOnTable.Count == 0)
            {
                cardsOnTable.Add(deck[deck.Count - 1]);
                this.Hand.dealtCards.Add(deck[deck.Count - 1]);
                deck.RemoveAt(deck.Count - 1);
                cardsOnTable.Add(deck[deck.Count - 1]);
                this.Hand.dealtCards.Add(deck[deck.Count - 1]);
                deck.RemoveAt(deck.Count - 1);
                cardsOnTable.Add(deck[deck.Count - 1]);
                this.Hand.dealtCards.Add(deck[deck.Count - 1]);
                deck.RemoveAt(deck.Count - 1);

                int position = -1;
                int type = (int)Business.Enum.Moves.Type.SetTableCard;
                int option = 0;
                this.addMove(position, type, option);
            }
            else if (cardsOnTable.Count == 3)
            {
                cardsOnTable.Add(deck[deck.Count - 1]);
                this.Hand.dealtCards.Add(deck[deck.Count - 1]);
                deck.RemoveAt(deck.Count - 1);

                int position = -1;
                int type = (int)Business.Enum.Moves.Type.SetTableCard;
                int option = 0;
                this.addMove(position, type, option);
            }
            else if (cardsOnTable.Count == 4)
            {
                cardsOnTable.Add(deck[deck.Count - 1]);
                this.Hand.dealtCards.Add(deck[deck.Count - 1]);
                deck.RemoveAt(deck.Count - 1);

                int position = -1;
                int type = (int)Business.Enum.Moves.Type.SetTableCard;
                int option = 0;
                this.addMove(position, type, option);
            }
        }

        public List<int> WhoIsWinner()
        {
            string board = "";
            for (int i = 0; i < cardsOnTable.Count; i++)
            {
                board += cardsOnTable[i].getStringForLib();
            }

            List<HoldemHand.Hand> hands = new List<HoldemHand.Hand>();
            List<HoldemHand.Hand> sortedHands = new List<HoldemHand.Hand>();
            for (int i = 0; i < CurrentHand.Count; i++)
            {
                Player player = Players[CurrentHand[i]];
                HoldemHand.Hand hand = new HoldemHand.Hand(player.card1.getStringForLib() + " " +
                                        player.card2.getStringForLib(), board);
                hands.Add(hand);
            }

            sortedHands = hands.OrderByDescending(x => x.HandValue).ToList();

            int tie = 1;
            for (int i = 0; i < CurrentHand.Count - 1; i++)
            {
                if (sortedHands[i].HandValue != sortedHands[i + 1].HandValue)
                    break;
                tie++;
            }

            List<int> retVal = new List<int>();

            for (int i = 0; i < CurrentHand.Count; i++)
            {
                for (int j = 0; j < tie; j++)
                {
                    if (hands[i] == sortedHands[j])
                    {
                        retVal.Add(CurrentHand[i]);
                    }
                }
            }

            return retVal;
        }

        public void SetWinning(List<int> positions)
        {
            for (int i = 0; i < positions.Count; i++)
            {
                Players[positions[i]].currentMoney += piles[0];
            }
        }

        public void RemovePlayer(int position)
        {
            FreeSeats++;
            UsedSeats[position] = false;

            UserRepository rep = new UserRepository();
            Table updateTable = rep.ReadTable(table.Id);

            if (FreeSeats == 8)
                rep.DeleteTable(table.Id);
            else
                rep.UpdateTable(table.Id, FreeSeats);

            User updateUser = rep.ReadByUsername(Players[position].username);
            rep.UpdateMoney(Players[position].username, updateUser.money + Players[position].currentMoney);

            Players.Remove(position);
        }
        public void addBestHand(int position)
        {
            UserRepository u = new UserRepository();
            User user = new User();
            user = u.ReadByUsername(this.Players[position].username);

            if (piles[0] > user.bestWinnings)
            {
                u.UpdateWinnings(user.username, piles[0], this.Hand);
            }
        }
        public void addMove(int position, int type, int option)
        {
            Move move = new Move();
            move.moveType = type;
            move.option = option;
            move.position = position;
            this.Hand.moves.Add(move);
        }
    }
}