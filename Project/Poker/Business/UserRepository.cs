using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Business.Properties;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Business.DomainModel;

namespace Business
{
    public class UserRepository
    {
        public MongoDatabase Database;
        public IMongoCollection<User> UserCollection;

        public UserRepository()
        {
            var mongoClient = new MongoClient(Settings.Default.ConnectionString);
            var db = mongoClient.GetDatabase(Settings.Default.DB);
            UserCollection = db.GetCollection<User>("User");
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
                Money = 500
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
    }
}
