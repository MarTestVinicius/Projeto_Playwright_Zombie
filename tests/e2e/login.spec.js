import { test } from '@playwright/test' ;
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

test('Realizar login Admin com sucesso', async ({ page }) => {
    await loginPage.SubmitFormularioAdmin('admin@zombieplus.com', 'pwd123');
    await moviePage.ValidarLoginAdminSucesso();
});

test('Realizar login Admin com Falha de Senha', async ({ page }) => {
    await loginPage.SubmitFormularioAdmin('admin@zombieplus.com', 'wrongpassword');
    await loginPage.ValidarLoginAdminFalha();
});

test('Realizar login Admin com Falha de Email', async ({ page }) => {
    await loginPage.SubmitFormularioAdmin('Wrongemaiil@zombieplus.com', 'pwd123');
    await loginPage.ValidarLoginAdminFalha();
});

test('Realizar login Admin Email vazio', async ({ page }) => {
    await loginPage.SubmitFormularioAdmin('', 'pwd123');
    await loginPage.ValidarLoginAdminFalhaCamposEmailVazio();
});

test('Realizar login Admin Senha vazio', async ({ page }) => {
    await loginPage.SubmitFormularioAdmin('admin@zombieplus.com', '');
    await loginPage.ValidarLoginAdminFalhaCamposSenhaVazio();
});

test('Realizar login Admin Senha e Email vazio', async ({ page }) => {
    await loginPage.SubmitFormularioAdmin('', '');
    await loginPage.ValidarLoginAdminFalhaCamposEmailSenhaVazio();
});

test('Realizar login Admin com Falha de estrutura de Email', async ({ page }) => {
    await loginPage.SubmitFormularioAdmin('admin@zombieplus', 'pwd123');
    await loginPage.ValidarLoginAdminFalhaEstruturaEmail();
});
