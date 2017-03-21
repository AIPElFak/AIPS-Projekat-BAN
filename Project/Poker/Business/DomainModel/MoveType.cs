using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Business.DomainModel
{
    public class MoveType
    {
        public ObjectId id { get; set; }
        public int num { get; set; }
        public string description { get; set; }
    }
}
