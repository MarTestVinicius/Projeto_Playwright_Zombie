const { test } = require('../support/index');
const { ExecutarSQL, ExecutarSQLConsulta } = require('.././support/database');
const data = require('../support/fixtures/tvshows.json');
const { MoviesApi } = require('../support/movie_api');
const { AuthApi } = require('../support/token.api');
const { expect } = require('@playwright/test');
const { TvshowPage } = require('../../pages/tvShowPage');


let api;

test.describe.configure({ mode: 'serial' });

test.afterAll(async () => {
    await ExecutarSQL('DELETE FROM tvshows');
})

test('deve cadastrar um novo TV Show', async ({ page }) => {

    const tvshow = data.create;
    await ExecutarSQL(`DELETE FROM tvshows WHERE title = '${tvshow.title}'`);// Limpar o TV Show do banco de dados antes do teste

    await page.login.IrPaginaInicialLoginAdmin();// Acessar a página de login do administrador
    await page.login.SubmitFormularioAdmin('admin@zombieplus.com', 'pwd123');// Enviar o formulário de login do administrador sem preencher os campos
    await page.movies.ValidarLoginAdminSucesso();// Validar login com sucesso.
    await page.tvshows.IrPaginaInicialTVShowAdmin();// Acessar a página inicial de TV Show do administrador
    await page.tvshows.AdicionarNovoTVShow();// Acessar a página de cadastro de TV Show
    await page.tvshows.PreencherformNovoTVShow(tvshow.title, tvshow.overview, tvshow.company, tvshow.release_year, tvshow.cover, tvshow.featured, tvshow.season.toString());// Preencher o formulário de cadastro de TV Show
    await page.tvshows.EnviarFormularioCadastrarNovoTVShow();// Enviar o formulário de cadastro de TV Show
    await page.tvshows.ValidarComponenteDeTVShowEnviadoSucesso(tvshow.title);// Validar componente de TV Show cadastrado com sucesso
});

test('Não deve cadastrar um novo TV Show com o mesmo título', async ({ page, request }) => {
    const tvshow = data.duplicate;
    //Comunição com API para adicionar o TV Show para fazer o teste de duplicidade
    await request.api.postTVShow(tvshow);// Cadastrar o TV Show usando a API para garantir que ele exista no banco de dados antes do teste

    await page.login.IrPaginaInicialLoginAdmin();// Acessar a página de login do administrador
    await page.login.SubmitFormularioAdmin('admin@zombieplus.com', 'pwd123');// Enviar o formulário de login do administrador sem preencher os campos
    await page.movies.ValidarLoginAdminSucesso();// Validar login com sucesso.
    await page.tvshows.IrPaginaInicialTVShowAdmin();// Acessar a página inicial de TV Show do administrador
    await page.tvshows.AdicionarNovoTVShow();// Acessar a página de cadastro de TV Show
    await page.tvshows.PreencherformNovoTVShow(tvshow.title, tvshow.overview, tvshow.company, tvshow.release_year, tvshow.cover, tvshow.featured, tvshow.season.toString());// Preencher o formulário de cadastro de TV Show
    await page.tvshows.EnviarFormularioCadastrarNovoTVShow();// Enviar o formulário de cadastro de TV Show
    await page.tvshows.ValidarComponenteDeTVShowEnviadoDuplicidade(tvshow.title);// Validar componente de TV Show cadastrado com sucesso
});

test('Não deve cadastrar quando os campos obrigatórios estiverem vazios', async ({ page }) => {

    await page.login.IrPaginaInicialLoginAdmin();// Acessar a página de login do administrador
    await page.login.SubmitFormularioAdmin('admin@zombieplus.com', 'pwd123');// Enviar o formulário de login do administrador sem preencher os campos
    await page.movies.ValidarLoginAdminSucesso();// Validar login com sucesso.
    await page.tvshows.IrPaginaInicialTVShowAdmin();// Acessar a página inicial de TV Show do administrador
    await page.tvshows.AdicionarNovoTVShow();// Acessar a página de cadastro de TV Show
    await page.tvshows.EnviarFormularioCadastrarNovoTVShow()// Enviar o formulário de cadastro de TV Show sem preencher os campos obrigatórios
    await page.tvshows.ValidarCamposObrigatoriosVazios()// Validar mensagens de erro para campos obrigatórios vazios
});


test('Não deve cadastrar um novo TV Show com o Campo "temporadas" diferente de valor Numérico', async ({ page}) => {
    const tvshow = data.create;

    await page.login.IrPaginaInicialLoginAdmin();// Acessar a página de login do administrador
    await page.login.SubmitFormularioAdmin('admin@zombieplus.com', 'pwd123');// Enviar o formulário de login do administrador sem preencher os campos
    await page.movies.ValidarLoginAdminSucesso();// Validar login com sucesso.
    await page.tvshows.IrPaginaInicialTVShowAdmin();// Acessar a página inicial de TV Show do administrador
    await page.tvshows.AdicionarNovoTVShow();// Acessar a página de cadastro de TV Show
    await page.tvshows.PreencherCampoTemporadasValorErro(tvshow.title, tvshow.overview, tvshow.company, tvshow.release_year, tvshow.cover, tvshow.featured);// Preencher o campo de temporadas com um valor não numérico
    await page.tvshows.EnviarFormularioCadastrarNovoTVShow()// Enviar o formulário de cadastro de TV Show com o campo de temporadas preenchido com valor não numérico
    await page.tvshows.ValidarCampoTemporadasValorErro()// Validar mensagem de erro para campo de temporadas com valor não numérico
});

test('Remover Tvshow cadastrados', async ({ page, request }) => {
    const tvshow = data.to_remove;
    await request.api.postTVShow(tvshow);// Cadastrar o TV Show usando a API para garantir que ele exista no banco de dados antes do teste

    await page.login.IrPaginaInicialLoginAdmin();// Acessar a página de login do administrador
    await page.login.SubmitFormularioAdmin('admin@zombieplus.com', 'pwd123');// Enviar o formulário de login do administrador sem preencher os campos
    await page.movies.ValidarLoginAdminSucesso();// Validar login com sucesso.
    await page.tvshows.IrPaginaInicialTVShowAdmin();// Acessar a página inicial de TV Show do administrador       await page.tvshows.RemoverTVShowDaLista(tvshow.title);// Remover o TV Show cadastrado usando a interface do usuário
    await page.tvshows.RemoverTVShowDaLista(tvshow.title);// Remover o TV Show cadastrado usando a interface do usuário
    await page.tvshows.ValidarTVShowRemovidoSucesso();// Validar que o popup TV Show foi removido com sucesso
});

test('deve fazer busca de TV Show pelo termo "zumbi"', async ({ page, request }) => {
    const tvshows = data.search;

    // "M" significa que o teste é feito um conteudo por vez
    tvshows.data.forEach(async (m) => {
        await request.api.postTVShow(m);
    });

    await page.login.IrPaginaInicialLoginAdmin();// Acessar a página de login do administrador
    await page.login.SubmitFormularioAdmin('admin@zombieplus.com', 'pwd123');// Enviar o formulário de login do administrador sem preencher os campos
    await page.movies.ValidarLoginAdminSucesso();// Validar login com sucesso.
    await page.tvshows.IrPaginaInicialTVShowAdmin();
    await page.tvshows.BuscarTVShowPeloUmTermo(tvshows.input);// Realizar a busca de TV Show pelo termo "zumbi"
    await page.tvshows.ValidarResultadoPesquisaTvShow(tvshows.outputs);// Validar que o resultado da pesquisa contém o filme esperado, indicando que a busca foi realizada com sucesso
});
