using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.UserTenant.UserTenantHandler
{
  public class UserTenantHandler
  {
    public string Code { get; set; }
    public Guid UserId { get; set; }
    public Guid TenantId { get; set; }
    public Guid? NewUserId {get; set; }
    public Guid? NewTenantId { get; set; }
    public string? NewCode {get; set; }
  }
}
