using Mars.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mars.Controllers
{
    public class ProductsController : Controller
    {
        private MarsEntities db = new MarsEntities();

        // GET: Products
        public ActionResult Index()
        {
            return View();
        }

        // JSON
        public JsonResult GetProductsDetails()
        {
            if (db.Products != null)
                return Json(db.Products.ToList(), JsonRequestBehavior.AllowGet);
            return Json(db.Products.ToList(), JsonRequestBehavior.DenyGet);
        }


        public JsonResult PostAddOneProduct(Product product)
        {
            if (ModelState.IsValid) // checking the fields are completed
            {
                var query = db.Products.Add(new Product() { Name = product.Name, Price = product.Price  });
                db.SaveChanges();
                return Json(db.Products.ToList(), JsonRequestBehavior.AllowGet);
            }
            return Json(db.Products.ToList(), JsonRequestBehavior.DenyGet);
        }

        public JsonResult PostUpdateOneProduct(Product product)
        {

            if (ModelState.IsValid)
            {
                try
                {
                    var query = db.Products.Where(prod => prod.Id == product.Id).Select(col => new { col.Name, col.Price }).Single();
                    query = new { product.Name, product.Price };
                    db.Entry(product).State = EntityState.Modified; // allow to update the entity
                    db.SaveChanges();
                    return Json(db.Products.ToList(), JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }
            return Json(db.Products.ToList(), JsonRequestBehavior.DenyGet);
        }


        public JsonResult DeleteOneProduct(int productId)
        {
            var delete = from product in db.Products
                         join prodsold in db.ProductSolds on product.Id equals prodsold.ProductId
                         where product.Id == productId && prodsold.ProductId == productId
                         select prodsold;

            foreach (var record in delete)
            {
                db.ProductSolds.Remove(record);
            }


            var p = db.Products.Where(prod => prod.Id == productId).Single();
            db.Products.Remove(p);

            db.SaveChanges();
            return Json(db.Products.ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}