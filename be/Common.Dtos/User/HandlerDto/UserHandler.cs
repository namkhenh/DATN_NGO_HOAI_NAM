using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.User.HandlerDto
{
  public class UserHandler
  {
    public string UserName { get; set; }
    public string? TenantCode { get; set; }
    public string Code { get; set; }
    public string Description { get; set; }
    public string? SiteCode { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public string Adress { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Password { get; set; }
  }
}
