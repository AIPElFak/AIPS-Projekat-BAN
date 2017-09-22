using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Poker.Hubs
{
    public abstract class Command
    {
        public Game thisGame { get; set; }
        protected Command() { }
        public abstract void Execute();
        public static Command makeCommand(Game game, string commandName, int money = 0)
        {
            switch (commandName)
            {
                case "deal":
                    return new Deal(game);
                case "smallBlind":
                    return new SmallBlind(game);
                case "bigBlind":
                    return new BigBlind(game);
                case "raise":
                    return new Raise(game, money);
                case "fold":
                    return new Fold(game);
                case "check":
                    return new Check(game, money);
                default:
                    return new DoNothing(game);
            }
        }
    }

    public class Deal : Command
    {
        public Deal(Game game)
        {
            this.thisGame = game;
        }
        public override void Execute()
        {
            int currentPos = thisGame.currentPlayer;
            for (int i = 0; i < thisGame.CurrentHand.Count; i++)
            {
                currentPos = (currentPos + 1) % thisGame.CurrentHand.Count;

                Card card1 = thisGame.deck[thisGame.deck.Count - 1];
                thisGame.deck.RemoveAt(thisGame.deck.Count - 1);
                Card card2 = thisGame.deck[thisGame.deck.Count - 1];
                thisGame.deck.RemoveAt(thisGame.deck.Count - 1);

                thisGame.Players[thisGame.CurrentHand[currentPos]].card1 = card1;
                thisGame.Players[thisGame.CurrentHand[currentPos]].card2 = card2;
            }
        }
    }

    public class SmallBlind : Command
    {
        public SmallBlind(Game game)
        {
            this.thisGame = game;
        }
        public override void Execute()
        {
            thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].currentMoney -= thisGame.table.smallBlind;
            thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].stakesMoney += thisGame.table.smallBlind;
            thisGame.piles[0] += thisGame.table.smallBlind;
        }
    }

    public class BigBlind : Command
    {
        public BigBlind(Game game)
        {
            this.thisGame = game;
        }
        public override void Execute()
        {
            thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].currentMoney -= thisGame.table.bigBlind;
            thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].stakesMoney += thisGame.table.bigBlind;
            thisGame.piles[0] += thisGame.table.bigBlind;
            thisGame.lastRasePlayer = thisGame.currentPlayer;
            thisGame.currentRaise = thisGame.table.bigBlind;
        }
    }

    public class Raise : Command
    {
        private int money;
        public Raise(Game game, int money)
        {
            this.thisGame = game;
            this.money = money;
        }
        public override void Execute()
        {
            thisGame.currentRaise += money;
            thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].currentMoney -=
                (thisGame.currentRaise - thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].stakesMoney);
            thisGame.piles[0] += (thisGame.currentRaise - thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].stakesMoney);
            thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].stakesMoney = thisGame.currentRaise;
            thisGame.lastRasePlayer = thisGame.currentPlayer;
        }
    }

    public class Fold : Command
    {
        public Fold(Game game)
        {
            this.thisGame = game;
        }
        public override void Execute()
        {
            thisGame.CurrentHand.RemoveAt(thisGame.currentPlayer);
            thisGame.currentPlayer = (thisGame.currentPlayer - 1) % thisGame.CurrentHand.Count;
        }
    }

    public class Check : Command
    {
        private int money;
        public Check(Game game, int money)
        {
            this.thisGame = game;
            this.money = money;
        }
        public override void Execute()
        {
            thisGame.currentRaise += money;
            thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].currentMoney -=
                (thisGame.currentRaise - thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].stakesMoney);
            thisGame.piles[0] += (thisGame.currentRaise - thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].stakesMoney);
            thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].stakesMoney = thisGame.currentRaise;
        }
    }

    public class DoNothing : Command
    {
        public DoNothing(Game game)
        {
            this.thisGame = game;
        }
        public override void Execute()
        {

        }
    }
}