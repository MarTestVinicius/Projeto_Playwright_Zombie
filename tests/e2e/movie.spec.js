const { test } = require('@playwright/test');
import { LoginPage } from '../../pages/loginAdminPage';
import { MoviePage } from '../../pages/moviePage';



/**
 * @type {LoginPage}
 */
let loginPage;
let moviePage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    moviePage = new MoviePage(page);
    await loginPage.IrPaginaInicialLoginAdmin();//visitar Página Inicial
});

test('deve cadastrar um novo filme', async ({ page }) => {
    await loginPage.SubmitFormularioAdmin('admin@zombieplus.com', 'pwd123');// Realizar login administrador
    await moviePage.ValidarLoginAdminSucesso();// Validar login bem-sucedido
    await moviePage.AdicionarNovoFilme();// Acessar a página de cadastro de filme
    await moviePage.PreencherformNovoFilme('titulo do filme', 'sinopse do filme', 'estúdio do filme', '2023');// Preencher o formulário de cadastro de filme
});
