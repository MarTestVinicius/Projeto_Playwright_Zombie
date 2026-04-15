const { test:base } = require('@playwright/test');

const { LeadsPage } = require('../../pages/leadspage');
const { LoginPage } = require('../../pages/loginAdminPage');
const { MoviePage } = require('../../pages/moviePage');
const { Toast } = require('../../components/Components');

const test = base.extend({
    // Aqui você pode adicionar fixtures personalizadas, se necessário
    page: async ({ page }, use) => {
        await use({
            ...page,
            leads: new LeadsPage(page),
            login: new LoginPage(page),
            movies: new MoviePage(page),
            toast: new Toast(page)
        })
    }
});

export { test };