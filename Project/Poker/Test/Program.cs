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
            Hand player3 = new Hand("2d 2s", board);
            // Print out a hand description: in this case both hands are
            // A straight, six high
            Console.WriteLine("Player1 Hand: {0}", player1.Description);
            Console.WriteLine("Player2 Hand: {0}", player2.Description);
            Console.WriteLine("Player3 Hand: {0}", player3.Description);



            Hand[] hands = new Hand[3];
            hands[0] = player1;
            hands[1] = player2;
            hands[2] = player3;
            hands = hands.OrderByDescending(x => x.HandValue).ToArray();
            Console.WriteLine(hands[0].Description);
         
        }
    }
}
