using Mars.Models;
using Newtonsoft.Json;
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

        // JSON : get all tables data and fill the dropdowns for adding a new sale
        public JsonResult GetSalesDetails()
        {
            if (db.ProductSolds != null)
            {
                var customers = db.Customers.Select(c => new { c.Id, c.Name }).ToList();
                var products = db.Products.Select(p => new { p.Id, p.Name }).ToList();
                var stores = db.Stores.Select(s => new { s.Id, s.Name }).ToList();
                List<Object> array = new List<Object>(){ customers, products, stores };
                return Json( array, JsonRequestBehavior.AllowGet);
            }                
            return Json(new { Success= false }, JsonRequestBehavior.DenyGet);
        }

        /// <summary>
        /// fetch all the Id by using join
        /// </summary>
        /// <param name="prodsold">s represents sale</param>
        /// <param name="store">sto represents store</param>
        /// <param name="col">col represents column</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult PostAddOneSale(ProductSold prodsold)
        {
            Console.WriteLine(Request.Form["date"]);
            if (prodsold != null) // checking the fields are completed
            {
                // get all ID
                var idcustomer = db.Customers.Where(user => user.Id == prodsold.CustomerId).Select(col => col.Id).Single();
                var idproduct = db.Products.Where(prod => prod.Id == prodsold.ProductId).Select(col => col.Id).Single();
                var idstore = db.Stores.Where(sto => sto.Id == prodsold.StoreId).Select(col => col.Id).Single();
                string text_date = Request.Form["date"]; // initial date  
                DateTime date = Convert.ToDateTime(text_date); // convert to Datetime

                if (idcustomer > 0 && idproduct > 0  && idstore > 0) // check if the ID exist for each table
                {
                    var query = db.ProductSolds.Add(new ProductSold() {
                        CustomerId = Convert.ToInt32(idcustomer),
                        ProductId = Convert.ToInt32(idproduct),
                        StoreId = Convert.ToInt32(idstore),
                        DateSold = date,
                    });
                    db.SaveChanges();
                    return Json("SUCCESS", JsonRequestBehavior.AllowGet);
                }
                return Json(Request, JsonRequestBehavior.AllowGet);
            }
            return Json("FAILED", JsonRequestBehavior.DenyGet);
        }


        public JsonResult DeleteOneSale(int saleId)
        {
            var sale = db.ProductSolds.Where(s => s.Id == saleId).Single();
            if (sale != null)
            {
                db.ProductSolds.Remove(sale);
                db.SaveChanges();
                return Json("SUCCESS", JsonRequestBehavior.AllowGet);
            }
            return Json("FAILED", JsonRequestBehavior.AllowGet);
        }

        // Get all the sales records
        public JsonResult GetAllSales()
        {
            db.Configuration.LazyLoadingEnabled = false; // ignore JSON errors
            var result = (dynamic)null;
            if (db.ProductSolds.Any())
            {
                result = db.ProductSolds.Select(col => new
                {
                    Id = col.Id,
                    Customer = col.Customer,
                    Product = col.Product,
                    Store = col.Store,
                    DateSold = col.DateSold
                }).ToList();
                db.Dispose();
                return Json( result , JsonRequestBehavior.AllowGet);
            }
            return Json("DATA NOT FOUND", JsonRequestBehavior.DenyGet);
        }


        public JsonResult PostUpdateOneSale(ProductSold prodsold)
        {

            if (ModelState.IsValid)
            {
                try
                {

                    /*var query = db.Customers.Where(user => user.Id == prodsold.Id).Select(col => new { col.Name }).Single();
              
                    query = new { customer.Name, customer.Address };*/
                    //db.Entry(prodsold).State = EntityState.Modified; // allow to update the entity
                    db.SaveChanges();
                    return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }
            return Json(new { Success = false }, JsonRequestBehavior.DenyGet);
        }
    }
}