using Amazon.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.UserSite.UserSiteHandler
{
  public class UserSiteHandler
  {
    public string Code { get; set; }
    public Guid UserId { get; set; }
    public Guid SiteId { get; set; }
    public Guid? NewUserId { get; set; }
    public Guid? NewSiteId { get; set; }
    public string? NewCode { get; set; }
  }
}
