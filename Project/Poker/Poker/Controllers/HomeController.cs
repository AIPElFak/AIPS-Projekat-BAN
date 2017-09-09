using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Poker.Models;

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
            return View("../Game/Game", m);
        }
    }
}