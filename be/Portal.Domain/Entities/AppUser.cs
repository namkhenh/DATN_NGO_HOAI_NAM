using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Domain.Entities
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public Guid? TenantId { get; set; }
        public Guid? SiteId { get; set; }
        public DateTime? DeleteAt { get; set; }
        public DateTimeOffset CreatedDate { get; set; }

        public DateTimeOffset? LastModifiedDate { get; set; }
    }
}
