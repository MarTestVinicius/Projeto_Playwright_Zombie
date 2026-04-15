const { test } = require('../support/index');
const { ExecutarSQL } = require ( '.././support/database');
const data = require('.././support/fixtures/movies.json');

test('deve cadastrar um novo filme', async ({ page }) => {
    await page.login.IrPaginaInicialLoginAdmin();//visitar Página Inicial
    const filme = data.create;
    await ExecutarSQL(`DELETE FROM movies WHERE title = '${filme.title}'`);// Limpar o filme do banco de dados antes do teste
    await page.login.SubmitFormularioAdmin('admin@zombieplus.com', 'pwd123');// Realizar login administrador
    await page.movies.ValidarLoginAdminSucesso();// Validar login bem-sucedido
    await page.movies.AdicionarNovoFilme();// Acessar a página de cadastro de filme
    await page.movies.PreencherformNovoFilme(filme.title, filme.overview, filme.company, filme.release_year);// Preencher o formulário de cadastro de filme
    await page.movies.EnviarFormularioCadastrarNovoFilme();// Enviar o formulário de cadastro de filme
    await page.movies.ValidarToastDeFilmeEnviadoSucesso();// Validar toast de filme cadastrado com sucesso
});
