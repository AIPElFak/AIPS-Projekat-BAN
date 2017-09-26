using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Business.DomainModel
{
    public class Hand
    {
        public ObjectId id { get; set; }
        public List<Card> dealtCards { get; set; }
        public List<Move> moves { get; set; }
        public Dictionary<string, string> username { get; set; }
        public Dictionary<string, List<Card>> cards { get; set; }
        public Hand()
        {
            dealtCards = new List<Card>();
            moves = new List<Move>();
            username = new Dictionary<string, string>();
            cards = new Dictionary<string, List<Card>>();
        }
    }
}
