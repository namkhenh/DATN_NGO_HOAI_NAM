using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.Tenant
{
  public class CreateUpdateTenant
  {
    public Guid? Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
  }
}
