using Mars.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mars.Controllers
{
    public class CustomersController : Controller
    {
        private MarsEntities db = new MarsEntities();

        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }


        // JSON
        public JsonResult GetCustomersDetails()
        {
            if (db.Customers != null)
                return Json(db.Customers.ToList(), JsonRequestBehavior.AllowGet); ;
            return Json(db.Customers.ToList(), JsonRequestBehavior.DenyGet);
        }

        [HttpPost]
        public ActionResult UpdateOneCustomer()
        {
            //var query = db.Customers.Where(lambda => lambda.Id == id);
            return null;
        }

        [HttpPost]
        public ActionResult DeleteOneCustomer()
        {
            //var query = db.Customers.Where(lambda => lambda.Id == id);
            return null;
        }

    }
}