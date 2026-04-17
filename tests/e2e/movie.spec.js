const { test } = require('../support/index');
const { ExecutarSQL, ExecutarSQLConsulta } = require('.././support/database');
const data = require('../support/fixtures/movies.json');
const { MoviesApi } = require('../support/movie_api');
const { AuthApi } = require('../support/token.api');
const { expect } = require('@playwright/test');


let api;


test('deve cadastrar um novo filme', async ({ page }) => {
    await page.login.IrPaginaInicialLoginAdmin();// Acessar a página de login do administrador
    await page.login.SubmitFormularioAdmin('admin@zombieplus.com', 'pwd123');// Enviar o formulário de login do administrador sem preencher os campos
    await page.movies.ValidarLoginAdminSucesso();// Validar login com sucesso.

    const filme = data.create;
    await ExecutarSQL(`DELETE FROM movies WHERE title = '${filme.title}'`);// Limpar o filme do banco de dados antes do teste

    await page.movies.AdicionarNovoFilme();// Acessar a página de cadastro de filme
    await page.movies.PreencherformNovoFilme(filme.title, filme.overview, filme.company, filme.release_year, filme.cover, filme.featured);// Preencher o formulário de cadastro de filme
    await page.movies.EnviarFormularioCadastrarNovoFilme();// Enviar o formulário de cadastro de filme
    await page.movies.ValidarToastDeFilmeEnviadoSucesso();// Validar toast de filme cadastrado com sucesso
});

test('Não deve cadastrar um novo filme com o mesmo título', async ({ page, request }) => {
    await page.login.IrPaginaInicialLoginAdmin();// Acessar a página de login do administrador
    await page.login.SubmitFormularioAdmin('admin@zombieplus.com', 'pwd123');// Enviar o formulário de login do administrador sem preencher os campos
    await page.movies.ValidarLoginAdminSucesso();// Validar login com sucesso.

    const filme = data.duplicate;
    //Comunição com API para adicionar o filme para fazer o teste de duplicidade
    await request.api.postMovie(filme);// Cadastrar o filme usando a API para garantir que ele exista no banco de dados antes do teste

    await page.movies.AdicionarNovoFilme();// Acessar a página de cadastro de filme
    await page.movies.PreencherformNovoFilme(filme.title, filme.overview, filme.company, filme.release_year, filme.cover, filme.featured);// Preencher o formulário de cadastro de filme
    await page.movies.EnviarFormularioCadastrarNovoFilme();// Enviar o formulário de cadastro de filme
    await page.movies.ValidarToastDeFilmeEnviadoDuplicidade();// Validar toast de filme cadastrado com sucesso
});

test('Não deve cadastrar quando os campos obrigatórios estiverem vazios', async ({ page }) => {

    await page.login.IrPaginaInicialLoginAdmin();// Acessar a página de login do administrador
    await page.login.SubmitFormularioAdmin('admin@zombieplus.com', 'pwd123');// Enviar o formulário de login do administrador sem preencher os campos
    await page.movies.ValidarLoginAdminSucesso();// Validar login com sucesso.
    await page.movies.AdicionarNovoFilme();// Acessar a página de cadastro de filme
    await page.movies.EnviarFormularioCadastrarNovoFilme()// Enviar o formulário de cadastro de filme sem preencher os campos obrigatórios
    await page.movies.ValidarCamposObrigatoriosVazios()// Validar mensagens de erro para campos obrigatórios vazios
});
