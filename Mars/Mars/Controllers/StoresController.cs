﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mars.Controllers
{
    public class StoresController : Controller
    {
        // GET: Stores
        public ActionResult Index()
        {
            return View();
        }
    }
}