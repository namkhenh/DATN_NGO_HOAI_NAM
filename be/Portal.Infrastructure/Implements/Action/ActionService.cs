using Common.Common.ActionResponse;
using Common.Dtos.Action;
using Portal.Application.Interfaces.Action;
using Portal.Application.Repositories.Interfaces.Action;
using Portal.Application.Repositories.Interfaces.Menu;
using Portal.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace Portal.Infrastructure.Implements.Action
{
  public class ActionService : IActionService
    {
        private readonly IActionRepository _actionRepository;
        private readonly IMenuRepository _menuRepository;
        public ActionService(IActionRepository actionRepository, IMenuRepository menuRepository)
        {
            _actionRepository = actionRepository;
            _menuRepository = menuRepository;
        }
        // không cần handler
       
     
    }
}
