const { test } = require('@playwright/test');
import { LoginPage } from '../../pages/loginAdminPage';
import { MoviePage } from '../../pages/moviePage';

const data = require('.././support/fixtures/movies.json');



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
    const filme = data.create;
    await loginPage.SubmitFormularioAdmin('admin@zombieplus.com', 'pwd123');// Realizar login administrador
    await moviePage.ValidarLoginAdminSucesso();// Validar login bem-sucedido
    await moviePage.AdicionarNovoFilme();// Acessar a página de cadastro de filme
    await moviePage.PreencherformNovoFilme(filme.title, filme.overview, filme.company, filme.release_year);// Preencher o formulário de cadastro de filme
    await moviePage.EnviarFormularioCadastrarNovoFilme();// Enviar o formulário de cadastro de filme
    await moviePage.ValidarToastDeFilmeEnviadoSucesso();// Validar toast de filme cadastrado com sucesso
});
