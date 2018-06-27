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
                return Json(db.Customers.ToList(), JsonRequestBehavior.AllowGet);
            return Json(db.Customers.ToList(), JsonRequestBehavior.DenyGet);
        }

        
        public JsonResult AddOneCustomer(string name, string address)
        {
            var query = db.Customers.Add(new Customer() { Name=name, Address=address});
            return Json(db.Customers.ToList(),JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult UpdateOneCustomer()
        {
            //var query = db.Customers.Where(lambda => lambda.Id == id);
            return null;
        }

        
        public JsonResult DeleteOneCustomer(int customerId)
        {
            var customer = db.Customers.Where(user => user.Id == customerId).Single();
            db.Customers.Remove(customer);
            db.SaveChanges();
            return Json(db.Customers.ToList(), JsonRequestBehavior.AllowGet);
        }

    }
}