using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Business.DomainModel
{
    public class Table
    {
        public ObjectId id { get; set; }
        public string tableType { get; set; }
        public List<int> freeSeats { get; set; }
        public Table()
        {
            freeSeats = new List<int>();
        }
    }
}
