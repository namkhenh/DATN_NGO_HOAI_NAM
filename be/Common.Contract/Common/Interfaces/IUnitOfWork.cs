﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Contract.Common.Interfaces
{
  public interface IUnitOfWork<TContext> : IDisposable where TContext : DbContext
  {
    Task<int> CommitAsync();
  }
}
