using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Configurations
{
    public class AppUserDepartmentConfiguration : IEntityTypeConfiguration<Portal.Domain.Entities.AppUserDepartment>
    {
        public void Configure(EntityTypeBuilder<Portal.Domain.Entities.AppUserDepartment> builder)
        {
            builder.ToTable("AppUserDepartments");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.DepartmentId).IsRequired();
            builder.Property(x => x.AppUserId).IsRequired();

            builder.Property(x => x.CreatedDate).IsRequired();
            builder.Property(x => x.LastModifiedDate);
            builder.Property(x => x.DeleteAt);
        }
    }
}
