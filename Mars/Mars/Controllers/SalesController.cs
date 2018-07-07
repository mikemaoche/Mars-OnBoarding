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

        /// <summary>
        /// fetch all the Id by using join
        /// </summary>
        /// <param name="prodsold">s represents sale</param>
        /// <param name="store">sto represents store</param>
        /// <returns></returns>
        public JsonResult PostAddOneSale(ProductSold prodsold)
        {
            if (ModelState.IsValid) // checking the fields are completed
            {
                var idcustomer = from c in db.Customers
                                 join s in db.ProductSolds on c.Id equals s.CustomerId
                                 where c.Id == s.CustomerId select c;
                var idproduct = from p in db.Products
                                 join s in db.ProductSolds on p.Id equals s.ProductId
                                 where p.Id == s.ProductId
                                 select p;
                var idstore = from sto in db.Stores
                                 join s in db.ProductSolds on sto.Id equals s.StoreId
                                 where sto.Id == s.StoreId
                                 select sto;
                if (true)
                {
                    var query = db.ProductSolds.Add(new ProductSold() {
                        CustomerId = ,
                        ProductId = prodsold.Address,
                        StoreId =,
                        DateSold = new DateTime(prodsold.DateSold),
                    });
                    db.SaveChanges();
                    return Json(prodsold, JsonRequestBehavior.AllowGet);
                }       
                
            }
            return Json(db.ProductSolds.ToList(), JsonRequestBehavior.DenyGet);
        }
    }
}