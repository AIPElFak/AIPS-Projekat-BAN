using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Bson.Serialization.Attributes;

namespace Business.DomainModel
{
    public class Table
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public int smallBlind { get; set; }
        public int bigBlind { get; set; }
        public int BuyInMin { get; set; }
        public int BuyInMax { get; set; }
        public int freeSeats { get; set; }
    }
}
