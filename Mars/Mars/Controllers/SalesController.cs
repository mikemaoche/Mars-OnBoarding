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
            {
                var customers = db.Customers.Select(c => new { c.Id, c.Name }).ToList();
                var products = db.Products.Select(p => new { p.Id, p.Name }).ToList();
                var stores = db.Stores.Select(s => new { s.Id, s.Name }).ToList();
                List<Object> array = new List<Object>(){ customers, products, stores };
                return Json(array, JsonRequestBehavior.AllowGet);
            }                
            return Json("NOT FOUND DATA", JsonRequestBehavior.DenyGet);
        }

        public JsonResult PostAddOneSale(ProductSold prodsold)
        {
            if (ModelState.IsValid) // checking the fields are completed
            {
                /*var idcustomer = db.Customers.Where()
                var query = db.ProductSolds.Add(new ProductSold() { CustomerId = prodsold.Name, Address = prodsold.Address });
                db.SaveChanges();*/
                return Json(prodsold, JsonRequestBehavior.AllowGet);
            }
            return Json(db.ProductSolds.ToList(), JsonRequestBehavior.DenyGet);
        }
    }
}