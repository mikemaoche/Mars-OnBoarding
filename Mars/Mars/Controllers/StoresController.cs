using Mars.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mars.Controllers
{
    public class StoresController : Controller
    {
        private MarsEntities db = new MarsEntities();

        // GET: Stores
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetStoresDetails()
        {
            if (db.Stores != null)
                return Json(db.Stores.ToList(), JsonRequestBehavior.AllowGet);
            return Json(db.Stores.ToList(), JsonRequestBehavior.DenyGet);
        }


        public JsonResult PostAddOneStore(Store store)
        {
            if (ModelState.IsValid) // checking the fields are completed
            {
                var query = db.Stores.Add(new Store() { Name = store.Name, Address = store.Address });
                db.SaveChanges();
                return Json(db.Stores.ToList(), JsonRequestBehavior.AllowGet);
            }
            return Json(db.Stores.ToList(), JsonRequestBehavior.DenyGet);
        }

        public JsonResult PostUpdateOneStore(Store store)
        {

            if (ModelState.IsValid)
            {
                try
                {
                    var query = db.Stores.Where(stor => stor.Id == store.Id).Select(col => new { col.Name, col.Address }).Single();
                    query = new { store.Name, store.Address };
                    db.Entry(store).State = EntityState.Modified; // allow to update the entity
                    db.SaveChanges();
                    return Json(db.Stores.ToList(), JsonRequestBehavior.AllowGet);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }
            return Json(db.Stores.ToList(), JsonRequestBehavior.DenyGet);
        }


        public JsonResult DeleteOneStore(int storeId)
        {
            var store = db.Stores.Where(stor => stor.Id == storeId).Single();
            db.Stores.Remove(store);
            db.SaveChanges();
            return Json(db.Stores.ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}
