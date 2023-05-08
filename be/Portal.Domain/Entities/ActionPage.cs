using Common.Contract.Domain.Interfaces;
using Common.Contract.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Domain.Entities
{
  public class ActionPage : EntityAuditBase<Guid>, IEntityBase<Guid>
  {
    public Guid ActionId { get; set; }
    public Guid PathId { get; set; }
  }
}
