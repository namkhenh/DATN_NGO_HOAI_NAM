using AutoMapper;
using Common.Dtos.ActionPage;
using Common.Dtos.Site;
using Common.Dtos.Tenant;
using Portal.Domain.Entities;

namespace Portal.API.AutoMapper
{
  public class AutoMapping : Profile
  {
    public AutoMapping()
    {
      //CreateMap<ActionPageDto, Portal.Domain.Entities.ActionPage>().ReverseMap();
     
    }
  }
}
