const { test:base } = require('@playwright/test');

const { LeadsPage } = require('../../pages/leadspage');
const { LoginPage } = require('../../pages/loginAdminPage');
const { MoviePage } = require('../../pages/moviePage');
const { Toast } = require('../../components/Components');

const test = base.extend({
    // Aqui você pode adicionar fixtures personalizadas, se necessário
    page: async ({ page }, use) => {
            const context = page

            context['leads'] = new LeadsPage(page),
            context['login'] = new LoginPage(page),
            context['movies'] = new MoviePage(page),
            context['toast'] = new Toast(page)
            await use(page);
        }
});

export { test };