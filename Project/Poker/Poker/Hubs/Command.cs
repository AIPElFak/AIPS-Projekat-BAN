using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Poker.Hubs
{
    public abstract class Command
    {
        public Game thisGame { get; set; }
        public GameHub gameHub {get; set; }
        protected Command() { }
        public abstract void Execute(int position);
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
            this.gameHub = new GameHub();
        }
        public override void Execute(int position)
        {
            int currentPos = position;
            for (int i = 0; i < thisGame.CurrentHand.Count; i++)
            {
                currentPos = (currentPos + 1) % thisGame.CurrentHand.Count;

                Card card1 = thisGame.deck[thisGame.deck.Count];
                thisGame.deck.RemoveAt(thisGame.deck.Count - 1);
                Card card2 = thisGame.deck[thisGame.deck.Count];
                thisGame.deck.RemoveAt(thisGame.deck.Count - 1);

                gameHub.sendCards(card1, card2, position);
            }

            thisGame.currentPlayer = (thisGame.currentPlayer + 1) % thisGame.CurrentHand.Count;
            gameHub.play(thisGame.Name, thisGame.CurrentHand[thisGame.currentPlayer], "smallBind", 0);
        }
    }

    public class SmallBlind : Command
    {
        public SmallBlind(Game game)
        {
            this.thisGame = game;
            this.gameHub = new GameHub();
        }
        public override void Execute(int position)
        {
            thisGame.Players[position].currentMoney -= thisGame.table.smallBlind;
            gameHub.smallBlind(thisGame.table.smallBlind, position);
            thisGame.currentPlayer = (thisGame.currentPlayer + 1) % thisGame.CurrentHand.Count;
            gameHub.play(thisGame.Name, thisGame.CurrentHand[thisGame.currentPlayer], "bigBind", 0);
        }
    }

    public class BigBlind : Command
    {
        public BigBlind(Game game)
        {
            this.thisGame = game;
            this.gameHub = new GameHub();
        }
        public override void Execute(int position)
        {
            thisGame.Players[position].currentMoney -= thisGame.table.bigBlind;
            gameHub.bigBlind(thisGame.table.bigBlind, position);
            thisGame.currentPlayer = (thisGame.currentPlayer + 1) % thisGame.CurrentHand.Count;
            thisGame.lastRase = position;
            gameHub.askPlayer(thisGame.CurrentHand[thisGame.currentPlayer]);
        }
    }

    public class Raise : Command
    {
        private int money;
        public Raise(Game game, int money)
        {
            this.thisGame = game;
            this.money = money;
            this.gameHub = new GameHub();
        }
        public override void Execute(int position)
        {

        }
    }

    public class Fold : Command
    {
        public Fold(Game game)
        {
            this.thisGame = game;
            this.gameHub = new GameHub();
        }
        public override void Execute(int position)
        {

        }
    }

    public class Check : Command
    {
        private int money;
        public Check(Game game, int money)
        {
            this.thisGame = game;
            this.money = money;
            this.gameHub = new GameHub();
        }
        public override void Execute(int position)
        {

        }
    }

    public class DoNothing : Command
    {
        public DoNothing(Game game)
        {
            this.thisGame = game;
            this.gameHub = new GameHub();
        }
        public override void Execute(int position)
        {

        }
    }
}