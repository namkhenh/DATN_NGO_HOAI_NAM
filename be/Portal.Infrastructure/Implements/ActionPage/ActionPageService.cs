using Common.Common.ActionResponse;
using Common.Dtos.ActionPage;
using MassTransit;
using Portal.Application.Interfaces.ActionPage;
using Portal.Application.Repositories.Interfaces.Action;
using Portal.Application.Repositories.Interfaces.ActionPage;
using Portal.Application.Repositories.Interfaces.Page;
using Portal.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Implements.ActionPage
{
  public class ActionPageService : IActionPageService
  {
    private readonly IPageRepository _pageRepository;
    private readonly IActionRepository _actionRepository;
    private readonly IActionPageRepository _actionPageRepository;
    public ActionPageService(IPageRepository pageRepository, IActionRepository actionRepository, IActionPageRepository actionPageRepository)
    {
      _actionPageRepository = actionPageRepository;
      _pageRepository = pageRepository;
      _actionRepository = actionRepository;
    }

   
  }
}
