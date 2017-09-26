using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Business.DomainModel
{
    public class Move
    {
        public ObjectId id { get; set; }
        public int moveType { get; set; }
        public int position { get; set; }
        public int option { get; set; }
    }
}
