using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Poker.Models;
using Business;

namespace Poker.Controllers
{
    public class LogInController : Controller
    {
        // GET: LogIn
        public ActionResult LogIn()
        {
            LogInModel model = new LogInModel();
            return View(model);
        }
        [HttpPost]
        public ActionResult LogIn(LogInModel lg)
        {
            try
            {
                UserRepository u = new UserRepository();
                if (ModelState.IsValid && u.IsMatch(lg.username, lg.password))
                {
                    Session["username"] = u.ReadByUsername(lg.username);
                    return RedirectToAction("Home", "Home");
                }
                else
                {
                    ViewBag.BadLogin = true;
                    return View(lg);
                }
            }
            catch (Exception e)
            {
                return View("ErrorPage", e);
            }
        }
        public ActionResult SignUp()
        {
            string returnString = "";
            return View(returnString);
        }
        [HttpPost]
        public ActionResult SignUp(string username, string password)
        {
            UserRepository u = new UserRepository();
            if (u.IsTaken(username))
            {
                ViewBag.returnString = "Username taken";
                return View("SignUp");
            }
            else
            {
                u.Register(username, password);
                var temp = u.ReadByUsername(username);
                Session["username"] = temp.username;
                return RedirectToAction("Home", "Home");
            }
        }
        public ActionResult LogOut()
        {
            Session["username"] = "";
            return RedirectToAction("LogIn");
        }
    }
}