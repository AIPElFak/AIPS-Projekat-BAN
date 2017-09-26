using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Business.DomainModel
{
    public class User
    {
        public ObjectId id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public int money { get; set; }
        public string avatarURL { get; set; }
        public int bestWinnings { get; set; }
        public MongoDBRef bestHand { get; set; }
    }
}
