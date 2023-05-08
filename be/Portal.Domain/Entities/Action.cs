using Common.Contract.Domain.Interfaces;
using Common.Contract.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Domain.Entities
{
  public class Action : EntityAuditBase<Guid>, IEntityBase<Guid>
  {
    public string Id { get; set; }
    public Guid MenuId { get; set; }
    public string Path { get; set; }

  }
}
