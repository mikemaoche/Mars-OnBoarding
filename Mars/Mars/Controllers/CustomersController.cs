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

        
        public JsonResult PostAddOneCustomer(Customer customer)
        {
            if (ModelState.IsValid) // checking the fields are completed
            {
                var query = db.Customers.Add(new Customer() { Name = customer.Name, Address = customer.Address });
                db.SaveChanges();
                return Json(db.Customers.ToList(), JsonRequestBehavior.AllowGet);
            }
            return Json(db.Customers.ToList(), JsonRequestBehavior.DenyGet);
        }

        public JsonResult PostUpdateOneCustomer(Customer customer)
        {
            
            if (ModelState.IsValid)
            {
                try
                {
                    var query = db.Customers.Where(user => user.Id == customer.Id).Select(col => new { col.Name , col.Address}).Single();
                    query = new {customer.Name, customer.Address};
                    db.Entry(customer).State = EntityState.Modified; // allow to update the entity
                    db.SaveChanges();
                    return Json(db.Customers.ToList(), JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }                
            }
            return Json(db.Customers.ToList(), JsonRequestBehavior.DenyGet);
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