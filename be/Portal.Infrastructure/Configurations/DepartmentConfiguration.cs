using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Configurations
{
    public class DepartmentConfiguration : IEntityTypeConfiguration<Portal.Domain.Entities.Department>
    {
        public void Configure(EntityTypeBuilder<Portal.Domain.Entities.Department> builder)
        {
            builder.ToTable("Departments");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).HasMaxLength(500).IsRequired();
            builder.Property(x => x.Description).HasMaxLength(500).IsRequired();
            builder.Property(x => x.CreatedDate).IsRequired();
            builder.Property(x => x.LastModifiedDate);
            builder.Property(x => x.DeleteAt);
        }
    }
}
