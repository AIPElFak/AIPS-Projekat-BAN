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
        public MongoDatabase dataBase;
        public IMongoCollection<User> UserCollection;
        public IMongoCollection<Table> TableCollection;
        public IMongoCollection<Hand> HandCollection;

        public UserRepository()
        {
            var mongoClient = new MongoClient(Settings.Default.ConnectionString);
            var db = mongoClient.GetDatabase(Settings.Default.DB);
            dataBase = mongoClient.GetServer().GetDatabase(Settings.Default.DB);
            UserCollection = db.GetCollection<User>("User");
            TableCollection = db.GetCollection<Table>("Table");
            HandCollection = db.GetCollection<Hand>("Hand");
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
        public void Register(string username,string password, string avatarURL)
        {
            User user = new User()
            {
                username = username,
                password = password,
                money = 100000000,
                avatarURL = avatarURL,
                bestWinnings = 0
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
        public void UpdateWinnings(string username,int winnings,Hand hand)
        {
            var u = (from user in UserCollection.AsQueryable<User>()
                         where user.username == username
                         select user).Single();

            Hand newBestHand = new Hand();
            foreach(var card in hand.cards)
            {
                List<Card> cards = new List<Card>();
                cards.Add(card.Value[0]);
                cards.Add(card.Value[1]);
                newBestHand.cards.Add(card.Key, cards);
            }
            foreach (var user in hand.username)
            {
                newBestHand.username.Add(user.Key, user.Value);
            }
            foreach (var move in hand.moves)
            {
                Move m = new Move();
                m.moveType = move.moveType;
                m.option = move.option;
                m.position = move.position;

                newBestHand.moves.Add(m);
            }
            foreach(var card in hand.dealtCards)
            {
                Card c = new Card();
                c.number = card.number;
                c.sign = card.sign;

                newBestHand.dealtCards.Add(c);
            }
            if(u.bestHand != null)
            {
                Hand oldHand = dataBase.FetchDBRefAs<Hand>(u.bestHand);
                var fil = Builders<Hand>.Filter.Eq("id", oldHand.id);
                HandCollection.DeleteOne(fil);
            }
            HandCollection.InsertOne(newBestHand);
            var filter = Builders<User>.Filter.Eq("username", username);
            var update = Builders<User>.Update.Set("bestHand", new MongoDBRef("Hand",newBestHand.id)).Set("bestWinnings",winnings);
            UserCollection.UpdateOneAsync(filter, update);
        }
        public Hand ReadHand(string username)
        {
            var u = (from user in UserCollection.AsQueryable<User>()
                     where user.username == username
                     select user).Single();

            Hand returnHand = new Hand();
            returnHand = dataBase.FetchDBRefAs<Hand>(u.bestHand);
            return returnHand;
        }
    }
}
