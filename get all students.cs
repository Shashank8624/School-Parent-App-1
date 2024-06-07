
        [HttpPut("approve/{ParentId}")]
        public async Task<IActionResult> ApproveParent(int ParentId)
        {
            var parent = await dbContext.Parents.FindAsync(ParentId);


            // Update parent application status to Approved 
            parent.Status = "Approved";
            dbContext.Entry(parent).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
            return NoContent();
        }


        [HttpPut("Reject/{ParentId}")]
        public async Task<IActionResult> RejectParent(int ParentId)
        {
            var parent = await dbContext.Parents.FindAsync(ParentId);


            // Update parent application status to Approved 
            parent.Status = "Rejected";
            dbContext.Entry(parent).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
            return NoContent();
        }
