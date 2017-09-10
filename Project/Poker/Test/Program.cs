using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business;
using HoldemHand;

namespace Test
{
    class Program
    {
        static void Main(string[] args)
        {
            string board = "2h 2c 5c 7c jh";
            Hand player1 = new Hand("5h 7h", board);
            Hand player2 = new Hand("jc ah", board);

            // Print out a hand description: in this case both hands are
            // A straight, six high
            Console.WriteLine("Player1 Hand: {0}", player1.Description);
            Console.WriteLine("Player2 Hand: {0}", player2.Description);

            // Compare hands
            if (player1 == player2)
            {
                Console.WriteLine("player1's hand is" +
                                  " equal to player2's hand");
            }
            else if (player1 > player2)
            {
                Console.WriteLine("player1's hand is " +
                                  "greater than player2's hand");
            }
            else
            {
                Console.WriteLine("player2's hand is greater" +
                                  " than or equal player1's hand");
            }
        }
    }
}
