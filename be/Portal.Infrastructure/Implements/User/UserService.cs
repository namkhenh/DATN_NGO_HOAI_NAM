using AutoMapper;
using AutoMapper.Configuration.Annotations;
using Common.Common.ActionResponse;
using Common.Dtos;
using Common.Dtos.User;
using Common.Dtos.User.HandlerDto;
using Common.Share.Common;
using Common.Share.SeedWorks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

using Portal.Application.Interfaces.User;
using Portal.Domain.Entities;
using Portal.Domain.Enums;
using Portal.Domain.ViewModel.Outh2;
using Portal.Infrastructure.Datas;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Implements.User
{
  public class UserService : IUserService
  {
    private readonly IConfiguration _config;
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    protected readonly UserManager<Portal.Domain.Entities.AppUser> _userManager;
    private readonly SignInManager<Portal.Domain.Entities.AppUser> _signInManager;
    protected readonly RoleManager<Portal.Domain.Entities.AppRole> _roleManager;
    public UserService(UserManager<Portal.Domain.Entities.AppUser> userManager, RoleManager<Portal.Domain.Entities.AppRole> roleManager, ApplicationDbContext context
      , IMapper mapper, SignInManager<Portal.Domain.Entities.AppUser> signInManager, IConfiguration config)
    {
      
      _config = config;
      _mapper = mapper;
      _userManager = userManager;
      _roleManager = roleManager;
      _context = context;
      _signInManager = signInManager;
    }
    public virtual string ConvertKeyFromString(string id)
    {
      if (id == null)
      {
        return default;
      }
      return (string)TypeDescriptor.GetConverter(typeof(string)).ConvertFromInvariantString(id);
    }
    public virtual Task<bool> ExistsUserAsync(string userId)
    {
      var id = ConvertKeyFromString(userId);
      return _userManager.Users.AnyAsync(x => x.Id.Equals(id));
    }

    public async Task<ActionResponse<UserDto>> CreateUserAsync(CreateUpdateUser request)
    {
      ActionResponse<UserDto> resultUserRes = new();
      var user = new Portal.Domain.Entities.AppUser()
      {
        UserName = request.UserName,
        Description = request.UserName,
        PhoneNumber = request.PhoneNumber,
        Email = request.Email,
        TenantId = request.TenantId,
        FirstName = request.FirstName,
        LastName = request.LastName,
        CreatedDate = DateTimeOffset.Now,
        LastModifiedDate = DateTimeOffset.Now
      };
      var identityResult = await _userManager.CreateAsync(user, request.Password);
      if (identityResult.Succeeded)
      {
        var userDto = _mapper.Map<Portal.Domain.Entities.AppUser, UserDto>(user);
        resultUserRes.Success = true;
        resultUserRes.Data = userDto;
      }
    
      return resultUserRes;
    }

    public async Task<ActionResponse<UserDto>> CreateUserClaimsAsync(string userid, string claimType, string claimValue)
    {
      ActionResponse<UserDto> result = new();
      var user = await _userManager.FindByIdAsync(userid.ToString());
      if (user != null)
      {
        var userClaim = await _userManager.AddClaimAsync(user, new Claim(claimType, claimValue));
        if (userClaim.Succeeded)
        {
          var userDto = _mapper.Map<Portal.Domain.Entities.AppUser, UserDto>(user);
          result.Success = true;
          result.Data = userDto;
        }

      }
      return result;
    }

    public async Task<ActionResponse<UserDto>> CreateUserRoleAsync(string userId, string roleId)
    {
      ActionResponse<UserDto> result = new();
      var user = await _userManager.FindByIdAsync(userId);
      if (user != null)
      {
        var selectRole = await _roleManager.FindByIdAsync(roleId);
        if (selectRole != null)
        {
          await _userManager.AddToRoleAsync(user, selectRole.Name);
          var userDto = _mapper.Map<Portal.Domain.Entities.AppUser, UserDto>(user);
          result.Success = true;
          result.Data = userDto;
        }
      }
      return result;
    }

    public async Task<ActionResponse<UserDto>> DeleteUserAsync(string userId)
    {
      ActionResponse<UserDto> result = new();
      var userIdentity = await _userManager.FindByIdAsync(userId);
      if (userIdentity != null)
      {
        await _userManager.DeleteAsync(userIdentity);
        UserDto userDto = _mapper.Map<Portal.Domain.Entities.AppUser, UserDto>(userIdentity);
        result.Success = true;
        result.Data = userDto;
        return result;
      }
      return result;
    }

    public Task<ActionResponse<UserClaim>> DeleteUserClaimAsync(string userId, int claimId)
    {
      throw new NotImplementedException();
    }

    public Task<ActionResponse<UserDto>> DeleteUserRoleAsync(string userId, string roleId)
    {
      throw new NotImplementedException();
    }

    public async Task<ActionResponse<UserDto>> GetUserAsync(string userId)
    {
      ActionResponse<UserDto> result = new();
      var user = await _userManager.FindByIdAsync(userId);
      UserDto userDto = new();
      if (user != null)
      {
        userDto = _mapper.Map<Portal.Domain.Entities.AppUser, UserDto>(user);

      }
      return result;
    }

    public async Task<ActionResponse<PagedList<UserDto>>> GetUserByRoleAsync(string roleId, string search, int pageIndex = 1, int pageSize = 10)
    {
      ActionResponse<PagedList<UserDto>> result = new();
      var id = ConvertKeyFromString(roleId);
      PagedList<Portal.Domain.Entities.AppUser> pagedList = new();
      var users = _context.Set<Portal.Domain.Entities.AppUser>()
               .Join(_context.Set<IdentityUserRole<string>>(), u => u.Id, ur => ur.UserId, (u, ur) => new { u, ur })
               .Where(t => t.ur.RoleId.Equals(id))
               .WhereIf(!string.IsNullOrEmpty(search), t => t.u.UserName.Contains(search) || t.u.Email.Contains(search))
               .Select(t => t.u);
      var pagedUsers = await users.PageBy(x => x.Id, pageIndex, pageSize)
                .ToListAsync();
      List<UserDto> lstUserDto = new();
      lstUserDto = _mapper.Map<List<Portal.Domain.Entities.AppUser>, List<UserDto>>(pagedUsers);
      var pageList = new PagedList<UserDto>(lstUserDto, pagedUsers.Count(), pageIndex, pageSize);
      result.Success = true;
      result.Data = pageList;
      return result;
    }

    public Task<ActionResponse<UserClaim>> GetUserClaimAsync(string userId, int claimId)
    {
      throw new NotImplementedException();
    }

    public Task<PagedList<UserClaim>> GetUserClaimsAsync(string userId, int pageIndex = 1, int pageSize = 10)
    {
      throw new NotImplementedException();
    }

    public Task<ActionResponse<UserDto>> GetUsersAsync(string search, int pageIndex = 1, int pageSize = 10)
    {
      throw new NotImplementedException();
    }

    public Task<ActionResponse<UserDto>> GetUsersByClaimAsync(string claimType, string claimValue, int pageIndex = 1, int pageSize = 10)
    {
      throw new NotImplementedException();
    }

    public Task<(ActionResponse<UserDto> resultUser, string userId)> UpdateUserAsync(CreateUpdateUser request)
    {
      throw new NotImplementedException();
    }

    public Task<ActionResponse<UserClaim>> UpdateUserClaimsAsync(string userId, string claimType, string claimValue, int claimId)
    {
      throw new NotImplementedException();
    }

    public Task<ActionResponse<UserDto>> UserChangePasswordAsync(string userId, string password)
    {
      throw new NotImplementedException();
    }

    public Task<ActionResponse<UserDto>> UpdateUser(CreateUpdateUser request)
    {
      throw new NotImplementedException();
    }

    public async Task<ActionResponse<UserDto>> Register(CreateUpdateUser request)
    {
      string tenantCode = "";
      string siteCode = "";
      if(request.TenantId != null)
      {
        
      }
      if(request.SiteId!= null)
      {
      }
      List<UserHandler> userHandlers = new();
      List<UserHandlerRequest> userHandlerRequest = new();
      ActionResponse<UserDto> result = new();
      try
      {
        var userFromDbBeforeCreated = await _userManager.FindByNameAsync(request.UserName);
        if(userFromDbBeforeCreated== null)
        {
          var user = new Portal.Domain.Entities.AppUser()
          {
            UserName = request.UserName,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            Description = request.Description,
            FirstName = request.FirstName,
            LastName = request.LastName,
            TenantId = request.TenantId??null,
            SiteId = request.SiteId??null
          };
          var userCreated = await _userManager.CreateAsync(user, request.Password);
          if (userCreated.Succeeded)
          {
            var appUserFromDb = await _userManager.FindByNameAsync(request.UserName);
            if (appUserFromDb != null)
            {
              var userDto = _mapper.Map<Portal.Domain.Entities.AppUser, UserDto>(appUserFromDb);
              result.Success = true;
              result.Data = userDto;
            }
            userHandlers.Add(new UserHandler()
            {
              Code = request.Code,
              FirstName = request.FirstName,
              LastName = request.LastName,
              Description = request.Description,
              Adress = request.Adress,
              Email = request.Email,
              PhoneNumber = request.PhoneNumber,
              TenantCode = tenantCode == "" ? null : tenantCode,
              SiteCode = siteCode == "" ? null : siteCode
            });
            userHandlerRequest.Add(new UserHandlerRequest()
            {
              AppUsers = userHandlers,
              Action = ActionHandler.Create
            });
          }
        }
        else
        {
          result.Success = false;
          result.Message = $"User {request.UserName} Created";
        }
        return result;
      }
      catch(Exception ex)
      {
        result.Success = false;
        result.Message = ex.Message;
        return result;
      }
      
     
    }
  }
}
