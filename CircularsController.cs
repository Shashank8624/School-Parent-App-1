using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using School_Parent_App.Data;
using School_Parent_App.Models;

namespace School_Parent_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CircularsController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        public CircularsController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;

        }


        [HttpPost]
        public async Task<IActionResult> CreateCircular(Circular circular)
        {
           
            dbContext.Circulars.Add(circular);
            // await dbContext.Students.AddAsync(student);

            await dbContext.SaveChangesAsync();
            return Ok(circular);

        }


        [HttpGet]
        public async Task<IActionResult> GetAllCirculars()
        {
            var circulars = await dbContext.Circulars.ToListAsync();
            return Ok(circulars);
        }


        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> EditCircular([FromRoute] int id, Circular circular)
        {

            var circulars = await dbContext.Circulars.FirstOrDefaultAsync(x => x.Id == circular.Id);
            dbContext.Entry(circulars).CurrentValues.SetValues(circular);
            await dbContext.SaveChangesAsync();

            return Ok(circular);

        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteParent([FromRoute] int id)
        {
            var circulars = await dbContext.Circulars.FirstOrDefaultAsync(x => x.Id == id);
            dbContext.Circulars.Remove(circulars);
            await dbContext.SaveChangesAsync();

            return Ok(circulars);




        }



    }
}
