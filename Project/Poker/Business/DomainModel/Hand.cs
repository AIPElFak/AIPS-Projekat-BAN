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
        public DateTime start { get; set; }
        public List<Card> dealtCards { get; set; }
        public MongoDBRef table { get; set; }
        public List<Move> moves { get; set; }
        public List<UserSeat> userSeats { get; set; }
        public Hand()
        {
            dealtCards = new List<Card>();
            moves = new List<Move>();
            userSeats = new List<UserSeat>();
        }
    }
}
