using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Business.DomainModel;
using Business.Enum;

namespace Poker.Hubs
{
    public abstract class Command
    {
        public Game thisGame { get; set; }
        protected Command() { }
        public abstract int Execute();
        public static Command makeCommand(Game game, Moves.Type commandName, int money = 0)
        {
            switch (commandName)
            {
                case Moves.Type.SetTableCard:
                    return new Deal(game);
                case Moves.Type.SmallBlind:
                    return new SmallBlind(game);
                case Moves.Type.BigBlind:
                    return new BigBlind(game);
                case Moves.Type.Raise:
                    return new Raise(game, money);
                case Moves.Type.Fold:
                    return new Fold(game);
                case Moves.Type.Check:
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
        public override int Execute()
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

            return 0;
        }
    }

    public class SmallBlind : Command
    {
        public SmallBlind(Game game)
        {
            this.thisGame = game;
        }
        public override int Execute()
        {
            thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].currentMoney -= thisGame.table.smallBlind;
            thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].stakesMoney += thisGame.table.smallBlind;
            thisGame.piles[0] += thisGame.table.smallBlind;
            return 0;
        }
    }

    public class BigBlind : Command
    {
        public BigBlind(Game game)
        {
            this.thisGame = game;
        }
        public override int Execute()
        {
            thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].currentMoney -= thisGame.table.bigBlind;
            thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].stakesMoney += thisGame.table.bigBlind;
            thisGame.piles[0] += thisGame.table.bigBlind;
            thisGame.lastRasePlayer = thisGame.currentPlayer;
            thisGame.currentRaise = thisGame.table.bigBlind;
            return 0;
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
        public override int Execute()
        {
            int diff;

            thisGame.currentRaise += money;
            thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].currentMoney -=
                (thisGame.currentRaise - thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].stakesMoney);
            diff = (thisGame.currentRaise - thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].stakesMoney);
            thisGame.piles[0] += diff;
            thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].stakesMoney = thisGame.currentRaise;
            thisGame.lastRasePlayer = thisGame.currentPlayer;

            return diff;
        }
    }

    public class Fold : Command
    {
        public Fold(Game game)
        {
            this.thisGame = game;
        }
        public override int Execute()
        {
            thisGame.CurrentHand.RemoveAt(thisGame.currentPlayer);
            thisGame.currentPlayer = (thisGame.currentPlayer - 1) % thisGame.CurrentHand.Count;

            return -1;
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
        public override int Execute()
        {
            int diff;

            thisGame.currentRaise += money;
            thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].currentMoney -=
                (thisGame.currentRaise - thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].stakesMoney);
            diff = (thisGame.currentRaise - thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].stakesMoney);
            thisGame.piles[0] += diff;
            thisGame.Players[thisGame.CurrentHand[thisGame.currentPlayer]].stakesMoney = thisGame.currentRaise;

            return diff;
        }
    }

    public class DoNothing : Command
    {
        public DoNothing(Game game)
        {
            this.thisGame = game;
        }
        public override int Execute()
        {
            return 0;
        }
    }
}