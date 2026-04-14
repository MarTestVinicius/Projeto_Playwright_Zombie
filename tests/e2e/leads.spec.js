// @ts-check
import { expect, test } from '@playwright/test';
import { LeadsPage } from '../../pages/leadspage';
import { faker } from '@faker-js/faker';

/**
 * @type {LeadsPage}
 */
let leadsPage;
/**
 * @type {string}
 */
let fakerName = faker.person.fullName();
/**
 * @type {string}
 */
let fakerEmail = faker.internet.email();

test.beforeEach(async ({ page }) => {
  leadsPage = new LeadsPage(page);
  await leadsPage.IrPaginaInicial();//visitar Página Inicial
});


test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  await leadsPage.AbrirModal();//abrir o modal
  await leadsPage.ValidarTituloModal();//validar abertura modal e o título do modal
  await leadsPage.PreencherFormularioNomeEmail(fakerName, fakerEmail);//preencher o formulário com nome e email
  await leadsPage.ValidarMensagemSucesso();//validar mensagem de sucesso e o desaparecimento da mensagem de sucesso
});

test('não deve cadastrar um lead com email já existente', async ({ page, request }) => {

  await leadsPage.AbrirModal();//abrir o modal
  await leadsPage.ValidarTituloModal();//validar abertura modal e o título do modal

  const leadData = { name: fakerName, email: fakerEmail };//gerar dados para que o Email já exista no banco de dados

  // Criar um lead diretamente via API para garantir que o email já exista
  const response = await request.post('http://localhost:3333/leads', { data: leadData });
  expect(response.status()).toBe(201); // Verificar se o lead foi criado com sucesso

  await leadsPage.PreencherFormularioNomeEmail(fakerName, fakerEmail);//preencher o formulário com nome e email
  await leadsPage.ValidarMensagemErroUsuariocCadastrado();//validar mensagem de erro para usuário já cadastrado

});

test('Não deve cadastrar com E-mail inválido', async ({ page }) => {
  await leadsPage.AbrirModal();//abrir o modal
  await leadsPage.ValidarTituloModal();//validar abertura modal e o título do modal
  await leadsPage.PreencherFormularioNomeEmail(fakerName, 'marquitoswim.com');//preencher o formulário com nome e email 
  await leadsPage.ValidarMensagemErroEmailInvalido();//validar mensagem de erro para email inválido
});


test('Não deve cadastrar com nome vazio', async ({ page }) => {
  await leadsPage.AbrirModal();//abrir o modal
  await leadsPage.ValidarTituloModal();//validar abertura modal e o título do modal
  await leadsPage.PreencherFormularioNomeEmail('', fakerEmail); //preencher o formulário com nome vazio e email válido
  await leadsPage.ValidarMensagemErroCampoObrigatorioNome();//validar mensagem de erro para nome vazio
});

test('Não deve cadastrar com E-mail vazio', async ({ page }) => {
  await leadsPage.AbrirModal();//abrir o modal
  await leadsPage.ValidarTituloModal();//validar abertura modal e o título do modal
  await leadsPage.PreencherFormularioNomeEmail(fakerName, '');//preencher o formulário com nome válido e email vazio
  await leadsPage.ValidarMensagemErroCampoObrigatorioEmail();//validar mensagem de erro para email vazio  
});


test('Não deve cadastrar com nome vazio e Email vazio', async ({ page }) => {
  await leadsPage.AbrirModal();//abrir o modal
  await leadsPage.ValidarTituloModal();//validar abertura modal e o título do modal
  await leadsPage.PreencherFormularioNomeEmail('', ''); //preencher o formulário com nome vazio e email vazio
  await leadsPage.ValidarMensagemErroCampoObrigatorioNome_Email();//validar mensagem de erro para nome vazio e email vazio
})

