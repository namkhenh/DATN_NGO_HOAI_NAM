using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.Tenant.HandlerDto
{
  public class TenantHandler
  {
    public string Code { get; set; }
    public string Name { get; set; }
    public string? NewCode { get; set; }
    public string? NewName { get; set; }
  }
}
