using Microsoft.AspNetCore.Authorization;
using Portal.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure
{
    public class Root
    {
        protected const string Module = "Portal";
        protected const string Rpc = "rpc/";
        protected const string Rest = "rest/";
    }
    public class PermissionRequirement : IAuthorizationRequirement
    {
        public PermissionRequirement()
        {

        }
    }
    public class PermissionHandler : AuthorizationHandler<PermissionRequirement>
    {
        //private readonly ICurrentContext _currentContext;
        //public PermissionHandler(ICurrentContext currentContext)
        //{
        //    _currentContext = currentContext;
        //}

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            return Task.CompletedTask;
        }
    }
}
