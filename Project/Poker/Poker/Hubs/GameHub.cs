using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Threading;
using Microsoft.AspNet.SignalR;
using Business.DomainModel;

namespace Poker.Hubs
{
    public class GameHub : Hub
    {
        private Games games;

        public GameHub()
        {
            games = Games.Instance;
        }
    
        public void enterGame(string username, string tableName)
        {
            int pos = games.findOrAddGame(tableName, username);
            Game game = games.listOfGames[tableName];
            game.Players[pos].connectionId = Context.ConnectionId;

            Groups.Add(Context.ConnectionId, tableName);

            Clients.Caller.myPosition(username, pos, game.Players[pos].currentMoney, game.Players[pos].avatar);

            foreach (KeyValuePair<int, Player> player in game.Players)
            {
                if (player.Key != pos)
                {
                    Clients.Caller.otherPlayers(player.Value.username, player.Key, 
                                                player.Value.currentMoney, player.Value.avatar);
                }
            }

            Clients.OthersInGroup(tableName).displayPlayer(username, pos, 
                                                            game.Players[pos].currentMoney, game.Players[pos].avatar);

            if (game.Players.Count == 2)
            {
                game.newHand();
                game.currentPlayer = 1;
                playDeal(game.Name);
            }
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            if (stopCalled)
            {
                string tableName = "";
                int pos = 0;
                foreach (KeyValuePair<string, Game> room in games.listOfGames)
                {
                    foreach (KeyValuePair<int, Player> player in room.Value.Players)
                    {
                        if (player.Value.connectionId == Context.ConnectionId)
                        {
                            tableName = room.Value.Name;
                            pos = player.Key;
                            break;
                        }
                    }

                    if (tableName != "")
                        break;
                }

                if (tableName == "")
                    return base.OnDisconnected(stopCalled);

                Game game = games.listOfGames[tableName];
                Groups.Remove(Context.ConnectionId, tableName);

                if (game.CurrentHand.Count > 1)
                {
                    if (pos == game.CurrentHand[game.currentPlayer])
                    {
                        game.CurrentCommand = Command.makeCommand(games.listOfGames[tableName], "fold", 0);
                        int amount = game.CurrentCommand.Execute();
                        Clients.Group(game.Name).displayPlayed(game.CurrentHand[game.currentPlayer],
                                                        amount);

                        game.currentPlayer = (game.currentPlayer + 1) % game.CurrentHand.Count;
                        if (game.CurrentHand.Count == 1)
                        {
                            List<int> winner = new List<int>();
                            winner.Add(game.CurrentHand[0]);
                            showPlayersCards(game);
                            Clients.Group(game.Name).showWinner(winner);
                            game.SetWinning(winner);

                            game.RemovePlayer(pos);

                            if (game.Players.Count >= 2)
                            {
                                Thread.Sleep(5000);
                                game.newHand();
                                playDeal(game.Name);
                            }
                            else
                                Clients.Group(tableName).resetTable();
                        }
                    }
                    else
                    {
                        Clients.Group(game.Name).displayPlayed(pos, -1);
                        game.RemovePlayer(pos);
                        game.CurrentHand.RemoveAt(game.currentPlayer);

                        if (game.CurrentHand.Count == 1)
                        {
                            List<int> winner = new List<int>();
                            winner.Add(game.CurrentHand[0]);
                            showPlayersCards(game);
                            Clients.Group(game.Name).showWinner(winner);
                            game.SetWinning(winner);

                            if (game.Players.Count >= 2)
                            {
                                Thread.Sleep(5000);
                                game.newHand();
                                playDeal(game.Name);
                            }
                            else
                                Clients.Group(tableName).resetTable();
                        }
                    }
                }
                else
                {
                    game.RemovePlayer(pos);
                }

                if (game.Players.Count > 0)
                    Clients.Group(game.Name).displayExit(pos);

                if (game.FreeSeats == 8)
                    games.listOfGames.Remove(tableName);
            }

            return base.OnDisconnected(stopCalled);
        }

        public void playDeal(string tableName)
        {
            Game game = games.listOfGames[tableName];
            game.CurrentCommand = Command.makeCommand(games.listOfGames[tableName], "deal", 0);
            game.CurrentCommand.Execute();

            Clients.Group(game.Name).resetTable();

            foreach (int pos in game.CurrentHand)
            {
                Clients.Group(game.Name).getCards(game.Players[pos].card1.getString(), game.Players[pos].card2.getString(), pos);
            }

            game.currentPlayer = (game.currentPlayer + 1) % game.CurrentHand.Count;

            foreach (int pos in game.CurrentHand)
            {
                List<Card> cards = new List<Card>();
                cards.Add(game.Players[pos].card1);
                cards.Add(game.Players[pos].card2);

                game.Hand.cards.Add(pos.ToString(), cards);
            }

            playSmallBlind(game.Name);
        }

        public void playSmallBlind(string tableName)
        {
            Game game = games.listOfGames[tableName];
            game.CurrentCommand = Command.makeCommand(games.listOfGames[tableName], "smallBlind", 0);
            game.CurrentCommand.Execute();

            int type = (int)Business.Enum.Moves.Type.SmallBlind;
            int position = game.CurrentHand[game.currentPlayer];
            int option = game.table.smallBlind;
            game.addMove(position, type, option);

            Clients.Group(game.Name).showSmallBlind(game.table.smallBlind, game.CurrentHand[game.currentPlayer]);

            game.currentPlayer = (game.currentPlayer + 1) % game.CurrentHand.Count;
            playBigBlind(game.Name);
        }

        public void playBigBlind(string tableName)
        {
            Game game = games.listOfGames[tableName];
            game.CurrentCommand = Command.makeCommand(games.listOfGames[tableName], "bigBlind", 0);
            game.CurrentCommand.Execute();

            
            int type = (int)Business.Enum.Moves.Type.BigBlind;
            int position = game.CurrentHand[game.currentPlayer];
            int option = game.table.bigBlind;
            game.addMove(position, type, option);

            Clients.Group(game.Name).showBigBlind(game.table.bigBlind, game.CurrentHand[game.currentPlayer]);

            game.lastRasePlayer = game.currentPlayer;
            game.currentPlayer = (game.currentPlayer + 1) % game.CurrentHand.Count;
            Clients.Group(game.Name).youAreNext(game.CurrentHand[game.currentPlayer], game.table.bigBlind, game.table.bigBlind);
        }

        public void play(int result, string tableName)
        {
            Game game = games.listOfGames[tableName];

            int type;
            int option;
            int position = game.CurrentHand[game.currentPlayer];

            if (result == -1)
            {
                game.CurrentCommand = Command.makeCommand(games.listOfGames[tableName], "fold", 0);
                type = (int)Business.Enum.Moves.Type.Fold;
                option = 0;
            }
            else if (result == 0)
            {
                game.CurrentCommand = Command.makeCommand(games.listOfGames[tableName], "check", 0);
                type = (int)Business.Enum.Moves.Type.Check;
                option = 0;
            }
            else
            {
                game.CurrentCommand = Command.makeCommand(games.listOfGames[tableName], "raise", result);
                type = (int)Business.Enum.Moves.Type.Raise;
                option = result;
            }

            game.addMove(position, type, option);

            int amount = game.CurrentCommand.Execute();

            Clients.Group(game.Name).displayPlayed(position, amount);

            game.currentPlayer = (game.currentPlayer + 1) % game.CurrentHand.Count;

            if (game.CurrentHand.Count == 1)
            {
                List<int> winner = new List<int>();
                winner.Add(game.CurrentHand[0]);


                Clients.Group(game.Name).showWinner(winner);
                game.SetWinning(winner);
                
                game.addMove(0, (int)Business.Enum.Moves.Type.Win, 0);

                foreach (var winn in winner)
                {
                    game.addBestHand(winn);
                }

                Thread.Sleep(5000);
                game.newHand();
                playDeal(game.Name);
                return;
            }
            else if (game.currentPlayer != game.lastRasePlayer)
            {
                Clients.Group(game.Name).youAreNext(game.CurrentHand[game.currentPlayer],
                    game.currentRaise - game.Players[game.CurrentHand[game.currentPlayer]].stakesMoney, game.table.bigBlind);
            }
            else
            {
                if (game.cardsOnTable.Count == 5)
                {
                    List<int> winners = game.WhoIsWinner();
                    showPlayersCards(game);                 
                    Clients.Group(game.Name).showWinner(winners);
                    game.SetWinning(winners);
                    
                    game.addMove(0, (int)Business.Enum.Moves.Type.Win, 0);

                    foreach (var winn in winners)
                    {
                        game.addBestHand(winn);
                    }

                    Thread.Sleep(5000);
                    game.newHand();
                    playDeal(game.Name);
                    return;
                }

                game.endCircle();
                game.lastRasePlayer = game.currentPlayer;

                List<string> cards = new List<string>();
                for (int i = 0; i < game.cardsOnTable.Count; i++)
                    cards.Add(game.cardsOnTable[i].getString());

                Clients.Group(game.Name).displayCardsOnTable(game.CurrentHand[game.currentPlayer], cards);
                Clients.Group(game.Name).youAreNext(game.CurrentHand[game.currentPlayer],
                    game.currentRaise - game.Players[game.CurrentHand[game.currentPlayer]].stakesMoney, game.table.bigBlind);

            }
        }

        public void send(string tableName, string username, string message)
        {
            Clients.OthersInGroup(tableName).displayMessage(username, message);
        }

        public void showPlayersCards(Game game)
        {
            for (int i = 0; i < game.CurrentHand.Count; i++)
            {
                int pos = game.CurrentHand[i];
                Clients.Group(game.Name).flipCards(game.Players[pos].card1.getString(), game.Players[pos].card2.getString(), pos);
            }
        }
    }
}