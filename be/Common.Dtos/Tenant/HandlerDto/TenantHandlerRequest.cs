using Amazon.Util;
using Common.Share.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.Tenant.HandlerDto
{
  public class TenantHandlerRequest:DataEntity
  {
    public List<TenantHandler> Tenants { get; set; }
    public ActionHandler Action { get; set; }
  }
}
