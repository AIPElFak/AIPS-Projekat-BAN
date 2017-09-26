using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Poker.Models;
using Business;
using Business.DomainModel;

namespace Poker.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            HomeModel m = new HomeModel();
            string username = (string)Session["username"];
            m.Load(username);
            return View("Home",m);
        }
        [HttpPost]
        public ActionResult Play(string smallblind,string bigblind, string buyinmin,string buyinmax)
        {
            GameModel m = new GameModel();
            string username = (string)Session["username"];
            m.Load(username,smallblind,bigblind,buyinmin,buyinmax);
            Session["currentMoney"] = m.money;
            UserRepository rep = new UserRepository();
            Table table = rep.FindTable(Int32.Parse(smallblind));
            if (table.freeSeats == 0)
            {
                table = rep.CreateTable(Int32.Parse(smallblind), Int32.Parse(bigblind), Int32.Parse(buyinmin), Int32.Parse(buyinmax));
            }
            m.gameName = table.Id;
            return View("../Game/Game", m);
        }
        public ActionResult Replay()
        {
            ReplayModel model = new ReplayModel();
            string username = (string)Session["username"]; ;
            model.Load(username);
            return View("../Game/Replay", model);
        }
    }
}