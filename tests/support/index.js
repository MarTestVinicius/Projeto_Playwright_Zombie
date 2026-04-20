const { test: base } = require('@playwright/test');
const { LeadsPage } = require('../../pages/leadspage');
const { LoginPage } = require('../../pages/loginAdminPage');
const { MoviePage } = require('../../pages/moviePage');
const { Componentes } = require('../../components/Components');
const { AuthApi } =  require ('../support/token.api');
const { TvshowPage } = require('../../pages/tvShowPage');


const test = base.extend({
    request: async ({ request}, use) => {
        const context = request
        //Service de aujtenticação
        context['api']= new AuthApi(request);
        //Entrega o request autentication ao teste
        await context['api'].setToken();
        await use(context);
    },
    // Aqui você pode adicionar fixtures personalizadas, se necessário
    page: async ({ page }, use) => {
        const context = page

        context['leads'] = new LeadsPage(page),
            context['login'] = new LoginPage(page),
            context['movies'] = new MoviePage(page),
            context['componentes'] = new Componentes(page)
            context['tvshows'] = new TvshowPage(page)
        await use(page);
    }
});

export { test };