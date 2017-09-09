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
        public string tableType { get; set; }
        public string tableBuyIn { get; set; }
        public int freeSeats { get; set; }
    }
}
