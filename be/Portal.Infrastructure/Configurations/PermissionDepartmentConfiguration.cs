using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Configurations
{
    public class PermissionDepartmentConfiguration : IEntityTypeConfiguration<Portal.Domain.Entities.PermissionDepartment>
    {
        public void Configure(EntityTypeBuilder<Portal.Domain.Entities.PermissionDepartment> builder)
        {
            builder.ToTable("PermissionDepartments");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.DepartmentId).IsRequired();
            builder.Property(x=>x.PermissionId).IsRequired();
             
            builder.Property(x => x.CreatedDate).IsRequired();
            builder.Property(x => x.LastModifiedDate);
            builder.Property(x => x.DeleteAt);
           
        }
    }
}
