using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portal.Domain.Common;
using Portal.Infrastructure;
using Portal.Infrastructure.Datas;
using System.ComponentModel;
using System.Reflection;

namespace Portal.API.Rpc.setup
{
    // Các size khác được init còn size Portal ko đc init
    // mục đích thêm api , page vào trong các service
    [Route("api/[controller]")]
    [ApiController]
    public class SetupController : RpcController
    {
        private readonly ApplicationDbContext _context;
        public SetupController(ApplicationDbContext context)
        {
            _context = context;

        }
        [HttpGet("Init")]
        public async Task<IActionResult> Init()
        {
            List<Type> routeTypes = typeof(SetupController).Assembly.GetTypes()
                .Where(x => typeof(Root).IsAssignableFrom(x) && x.IsClass && x.Name != "Root")
                .ToList();
            return Ok();
        }
        private void InitMenu(List<Type> routeTypes)
        {
            foreach (Type type in routeTypes)
            {
                var DisplayName = type.GetCustomAttributes(typeof(DisplayNameAttribute), true)
                     .Select(x => ((DisplayNameAttribute)x).DisplayName)
                     .DefaultIfEmpty(type.Name)
                     .FirstOrDefault();
                Console.WriteLine(DisplayName);
            }
        }
        private void InitPage(List<Type> routeTypes)
        {
            foreach (Type type in routeTypes)
            {
                var values = type.GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)
                .Where(fi => fi.IsLiteral && !fi.IsInitOnly && fi.FieldType == typeof(string))
                .Select(x => (string)x.GetRawConstantValue())
                .ToList();
                foreach (var value in values)
                {
                    Console.WriteLine(value);
                }
            }
        }
        private void InitAction(List<Type> routeTypes)
        {
            foreach (Type type in routeTypes)
            {
                var values = type.GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)
                     .Where(fi => !fi.IsInitOnly && fi.FieldType == typeof(Dictionary<string, IEnumerable<string>>))
                     .Select(x => (Dictionary<string, IEnumerable<string>>)x.GetValue(x))
                     .FirstOrDefault();
                foreach (var value in values)
                {
                    Console.WriteLine(value.Key);
                    var content = value.Value;
                }
            }
        }
    }
}
