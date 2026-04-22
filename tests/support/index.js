import { test as base } from '@playwright/test';
import { LeadsPage } from '../../pages/leadspage';
import { LoginPage } from '../../pages/loginAdminPage';
import { MoviePage } from '../../pages/moviePage';
import { Componentes } from '../../components/Components';
import { AuthApi } from '../support/token.api';
import { TvshowPage } from '../../pages/tvShowPage';


const test = base.extend({
    request: async ({ request }, use) => {
        const context = request;
        //Service de aujtenticação
        context['api'] = new AuthApi(request);
        //Entrega o request autentication ao teste
        await context['api'].setToken();
        await use(context);
    },
    // Aqui você pode adicionar fixtures personalizadas, se necessário
    page: async ({ page }, use) => {
        const context = page;

        context['leads'] = new LeadsPage(page);
        context['login'] = new LoginPage(page);
        context['movies'] = new MoviePage(page);
        context['componentes'] = new Componentes(page);
        context['tvshows'] = new TvshowPage(page);
        await use(page);
    }
});

export { test };