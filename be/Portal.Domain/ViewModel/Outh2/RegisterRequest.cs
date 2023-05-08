﻿using Microsoft.EntityFrameworkCore.Update.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Domain.ViewModel.Outh2
{
    public class RegisterRequest
    {
        public string UserName {get;set;}
        public string Password { get;set;}
        public string Email { get;set;}
        public string PhoneNumber { get;set;}   
    }
}
