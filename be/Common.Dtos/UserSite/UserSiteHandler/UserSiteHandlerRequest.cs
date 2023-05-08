using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.UserSite.UserSiteHandler
{
  public class UserSiteHandlerRequest
  {
    public List<UserSiteHandler> UserSites { get; set; }  
    public ActionHandler Action { get; set; }
  }
}
