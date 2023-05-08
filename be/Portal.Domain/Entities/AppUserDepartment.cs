﻿using Common.Contract.Domain.Interfaces;
using Common.Contract.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Portal.Domain.Entities
{
    public class AppUserDepartment: EntityAuditBase<Guid>, IEntityBase<Guid>
    {
        public Guid AppUserId { get; set; }
        public Guid DepartmentId { get; set; }
    }
}
