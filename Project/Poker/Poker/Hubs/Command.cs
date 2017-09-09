using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Poker.Hubs
{
    public interface Command
    {
        void Execute();
    }

    public class Deal : Command
    {
        public void Execute()
        {

        }
    }

    public class SmallBind : Command
    {
        public void Execute()
        {

        }
    }

    public class BigBind : Command
    {
        public void Execute()
        {

        }
    }

    public class Rase : Command
    {
        public void Execute()
        {

        }
    }

    public class Fold : Command
    {
        public void Execute()
        {

        }
    }

    public class Check : Command
    {
        public void Execute()
        {

        }
    }
}