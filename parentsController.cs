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
