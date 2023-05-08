using Common.Share.Common;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.User.HandlerDto
{
  public class UserHandlerRequest : DataEntity
  {
    public List<UserHandler> AppUsers { get; set; }
    public ActionHandler Action { get; set; }
  }
}
