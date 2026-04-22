import { test } from '../support/index';

test('Validar Acessibilidade Leads', async ({ page }) => {
  await page.leads.IrPaginaInicial();//visitar Página Inicial
  await page.leads.ValidarAcessibilidadeLeads();
});

test('Validar Acessibilidade Movie Page', async ({ page }) => {
  await page.login.IrPaginaInicialLoginAdmin();// Acessar a página de login do administrador
  await page.login.SubmitFormularioAdmin('admin@zombieplus.com', 'pwd123');
  await page.movies.ValidarAcessibilidadeMoviePage();
});

test('Validar Acessibilidade TV Shows Page', async ({ page }) => {
  await page.login.IrPaginaInicialLoginAdmin();// Acessar a página de login do administrador
  await page.login.SubmitFormularioAdmin('admin@zombieplus.com', 'pwd123');
  await page.tvshows.IrPaginaInicialTVShowAdmin();// Acessar a página inicial de TV Show do administrador
  await page.tvshows.AdicionarNovoTVShow();// Acessar a página de cadastro de TV Show do administrador
  await page.tvshows.ValidarAcessibilidadeTVShowsPage();
});

test('validar Acessibilidade Login admin page', async ({ page }) =>{
  await page.login.IrPaginaInicialLoginAdmin();
  await page.login.ValidarAcessibilidadeLoginAdminPage();
});