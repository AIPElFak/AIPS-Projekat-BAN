using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business.Properties;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Business.DomainModel;
using MongoDB.Bson;

namespace Business
{
    public class UserRepository
    {
        public MongoDatabase Database;
        public IMongoCollection<User> UserCollection;
        public IMongoCollection<Table> TableCollection;

        public UserRepository()
        {
            var mongoClient = new MongoClient(Settings.Default.ConnectionString);
            var db = mongoClient.GetDatabase(Settings.Default.DB);
            UserCollection = db.GetCollection<User>("User");
            TableCollection = db.GetCollection<Table>("Table");
        }

        public bool IsTaken(string username)
        {
            var query = (from user in UserCollection.AsQueryable<User>()
                         where user.username == username
                         select user).Any();

            return query;
        }
        public bool IsMatch(string username,string password)
        {
            var query = (from user in UserCollection.AsQueryable<User>()
                         where (user.username == username && user.password == password)
                         select user).Any();

            return query;
        }
        public void Register(string username,string password)
        {
            User user = new User()
            {
                username = username,
                password = password,
                money = 100000000
            };

            UserCollection.InsertOne(user);
        }
        public User ReadByUsername(string username)
        {
            var query = (from user in UserCollection.AsQueryable<User>()
                         where user.username == username
                         select user).Single();

            return query;
        }

        public Table ReadTable(string id)
        {
            var query = (from table in TableCollection.AsQueryable<Table>()
                         where table.Id == id
                         select table).Single();

            return query;
        }
        public Table FindTable(int smallBlind)
        {
            Table retVal = new Table()
            {
                freeSeats = 0,
                smallBlind = smallBlind
            };

            var query = (from table in TableCollection.AsQueryable<Table>()
                         where table.smallBlind == smallBlind
                         select table);

            if (query != null && query.Count() > 0)
            {
                foreach (Table table in query)
                {
                    if (retVal.freeSeats < table.freeSeats)
                        retVal = table;
                }

                if (retVal.freeSeats > 0)
                    retVal.freeSeats--;

                return retVal;
            }

            return retVal;
        }
 
        public Table CreateTable(int smallBlind, int bigBlind, int buyInMin, int buyInMax)
        {
            Table table = new Table()
            {
                smallBlind = smallBlind,
                bigBlind = bigBlind,
                BuyInMin = buyInMin,
                BuyInMax = buyInMax,
                freeSeats = 7
            };

            TableCollection.InsertOne(table);

            return table;
        }

        public void DeleteTable(string tableId)
        {
            var filter = Builders<Table>.Filter.Eq("id", tableId);
            TableCollection.DeleteOne(filter);
        }

        public void UpdateTable(string tableId, int freeSeats)
        {
            var filter = Builders<Table>.Filter.Eq("id", tableId);
            var update = Builders<Table>.Update.Set("freeSeats", freeSeats).CurrentDate("lastModified");
            TableCollection.UpdateOne(filter, update);
        }

        public void UpdateMoney(string username,int money)
        {
            var filter = Builders<User>.Filter.Eq("username", username);
            var update = Builders<User>.Update.Set("money", money);
            UserCollection.UpdateOneAsync(filter, update);
        }
    }
}
