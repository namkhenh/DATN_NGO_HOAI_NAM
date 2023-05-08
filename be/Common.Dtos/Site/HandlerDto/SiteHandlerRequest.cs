using Common.Share.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.Site.HandlerDto
{
  public class SiteHandlerRequest : DataEntity
  {
    public List<SiteHandler>? Sites { get; set; }
    public ActionHandler? Action { get; set; }
  }
}
