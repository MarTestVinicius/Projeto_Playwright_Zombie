const { test } = require('../support/index');
import { faker } from '@faker-js/faker';
const { ExecutarSQL, ExecutarSQLConsulta } = require('.././support/database');

/**
 * @type {string}
 */
let fakerName = faker.person.fullName();
/**
 * @type {string}
 */
let fakerEmail = faker.internet.email();

test.describe.configure({ mode: 'serial' });// Configurar os testes para serem executados em série, garantindo que o estado do banco de dados seja consistente entre os testes

test.beforeEach(async ({ page }) => {
  await page.leads.IrPaginaInicial();//visitar Página Inicial
});

test.afterAll(async () => {
    await ExecutarSQL('DELETE FROM leads');
})

test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  await page.leads.AbrirModal();//abrir o modal
  await page.leads.ValidarTituloModal();//validar abertura modal e o título do modal
  await page.leads.PreencherFormularioNomeEmail(fakerName, fakerEmail);//preencher o formulário com nome e email
  await page.leads.ValidarMensagemSucesso();//validar mensagem de sucesso e o desaparecimento da mensagem de sucesso
});

test('não deve cadastrar um lead com email já existente', async ({ page, request }) => {

  await ExecutarSQL('DELETE FROM leads');
  await page.leads.AbrirModal();//abrir o modal
  await page.leads.ValidarTituloModal();//validar abertura modal e o título do modal
  const leadData = { name: fakerName, email: fakerEmail };//gerar dados para que o Email já exista no banco de dados
  await request.api.AdicionarLeadApi(leadData);//adicionar o lead diretamente via API para garantir que o email já exista no banco de dados
  await page.leads.PreencherFormularioNomeEmail(fakerName, fakerEmail);//preencher o formulário com nome e email
  await page.leads.ValidarMensagemErroUsuariocCadastrado();//validar mensagem de erro para usuário já cadastrado
});

test('Não deve cadastrar com E-mail inválido', async ({ page }) => {
  await page.leads.AbrirModal();//abrir o modal
  await page.leads.ValidarTituloModal();//validar abertura modal e o título do modal
  await page.leads.PreencherFormularioNomeEmail(fakerName, 'marquitoswim.com');//preencher o formulário com nome e email 
  await page.leads.ValidarMensagemErroEmailInvalido();//validar mensagem de erro para email inválido
});


test('Não deve cadastrar com nome vazio', async ({ page }) => {
  await page.leads.AbrirModal();//abrir o modal
  await page.leads.ValidarTituloModal();//validar abertura modal e o título do modal
  await page.leads.PreencherFormularioNomeEmail('', fakerEmail); //preencher o formulário com nome vazio e email válido
  await page.leads.ValidarMensagemErroCampoObrigatorioNome();//validar mensagem de erro para nome vazio
});

test('Não deve cadastrar com E-mail vazio', async ({ page }) => {
  await page.leads.AbrirModal();//abrir o modal
  await page.leads.ValidarTituloModal();//validar abertura modal e o título do modal
  await page.leads.PreencherFormularioNomeEmail(fakerName, '');//preencher o formulário com nome válido e email vazio
  await page.leads.ValidarMensagemErroCampoObrigatorioEmail();//validar mensagem de erro para email vazio  
});


test('Não deve cadastrar com nome vazio e Email vazio', async ({ page }) => {
  await page.leads.AbrirModal();//abrir o modal
  await page.leads.ValidarTituloModal();//validar abertura modal e o título do modal
  await page.leads.PreencherFormularioNomeEmail('', ''); //preencher o formulário com nome vazio e email vazio
  await page.leads.ValidarMensagemErroCampoObrigatorioNome_Email();//validar mensagem de erro para nome vazio e email vazio
})

