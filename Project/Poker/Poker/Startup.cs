using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Poker.Startup))]
namespace Poker
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}
