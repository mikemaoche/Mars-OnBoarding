using Mars.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mars.Controllers
{
    public class SalesController : Controller
    {
        private MarsEntities db = new MarsEntities();

        // GET: Sales
        public ActionResult Index()
        {
            return View();
        }

        // JSON
        public JsonResult GetSalesDetails()
        {
            if (db.ProductSolds != null)
                return Json(db.ProductSolds.ToList(), JsonRequestBehavior.AllowGet);
            return Json("NOT FOUND DATA", JsonRequestBehavior.DenyGet);
        }
    }
}