[HttpGet("{RegistrationId:int}")]
        public async Task<ActionResult<Parent>> GetEmployee(int RegistrationId)
        {
            try
            {
                var result = await dbContext.Parents.ToListAsync(RegistrationId);

                if (result == null) return NotFound();

                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }



[HttpGet("{RegistrationId:long}")]
public async Task<ActionResult<Parent>> GetEmployee(long RegistrationId)
{
    try
    {
        // Log the RegistrationId being searched for
        Console.WriteLine($"Searching for parent with RegistrationId: {RegistrationId}");
        
        var result = await dbContext.Parents.FirstOrDefaultAsync(p => p.RegistrationId == RegistrationId);

        if (result == null)
        {
            // Log if not found
            Console.WriteLine("Parent not found.");
            return NotFound();
        }

        return Ok(result);
    }
    catch (Exception ex)
    {
        // Log the exception
        Console.WriteLine($"Error: {ex.Message}");
        return StatusCode(StatusCodes.Status500InternalServerError,
            "Error retrieving data from the database");
    }
}