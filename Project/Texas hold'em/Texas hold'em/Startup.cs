using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Texas_hold_em.Startup))]
namespace Texas_hold_em
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
