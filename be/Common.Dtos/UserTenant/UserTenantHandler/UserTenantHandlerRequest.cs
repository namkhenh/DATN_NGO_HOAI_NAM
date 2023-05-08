using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.UserTenant.UserTenantHandler
{
  public class UserTenantHandlerRequest
  {
    public List<UserTenantHandler> UserTenants { get; set; }
    public ActionHandler Action { get; set; }
  }
}
