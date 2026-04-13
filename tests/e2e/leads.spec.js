// @ts-check
import { test } from '@playwright/test';
import { LeadsPage } from '../../pages/leadspage';
import { faker } from '@faker-js/faker';

/**
 * @type {LeadsPage}
 */
let leadsPage;

test.beforeEach(async ({ page }) => {
  leadsPage = new LeadsPage(page);
  await leadsPage.IrPaginaInicial();//visitar Página Inicial
});

test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  await leadsPage.AbrirModal();//abrir o modal
  await leadsPage.ValidarTituloModal();//validar abertura modal e o título do modal
  await leadsPage.PreencherFormularioNomeEmail(faker.person.fullName(), faker.internet.email());//preencher o formulário com nome e email
  await leadsPage.ValidarMensagemSucesso();//validar mensagem de sucesso e o desaparecimento da mensagem de sucesso
});

test('Não deve cadastrar com E-mail inválido', async ({ page }) => {
  await leadsPage.AbrirModal();//abrir o modal
  await leadsPage.ValidarTituloModal();//validar abertura modal e o título do modal
  await leadsPage.PreencherFormularioNomeEmail(faker.person.fullName(), 'marquitoswim.com');//preencher o formulário com nome e email 
  await leadsPage.ValidarMensagemErroEmailInvalido();//validar mensagem de erro para email inválido
});


test('Não deve cadastrar com nome vazio', async ({ page }) => {
  await leadsPage.AbrirModal();//abrir o modal
  await leadsPage.ValidarTituloModal();//validar abertura modal e o título do modal
  await leadsPage.PreencherFormularioNomeEmail('', 'marcus.vinicius@gmail.com'); //preencher o formulário com nome vazio e email válido
  await leadsPage.ValidarMensagemErroCampoObrigatorioNome();//validar mensagem de erro para nome vazio
});

test('Não deve cadastrar com E-mail vazio', async ({ page }) => {
  await leadsPage.AbrirModal();//abrir o modal
  await leadsPage.ValidarTituloModal();//validar abertura modal e o título do modal
  await leadsPage.PreencherFormularioNomeEmail('Marcus Vinicius', '');//preencher o formulário com nome válido e email vazio
  await leadsPage.ValidarMensagemErroCampoObrigatorioEmail();//validar mensagem de erro para email vazio  
});


test('Não deve cadastrar com nome vazio e Email vazio', async ({ page }) => {
  await leadsPage.AbrirModal();//abrir o modal
  await leadsPage.ValidarTituloModal();//validar abertura modal e o título do modal
  await leadsPage.PreencherFormularioNomeEmail('', ''); //preencher o formulário com nome vazio e email vazio
  await leadsPage.ValidarMensagemErroCampoObrigatorioNome_Email();//validar mensagem de erro para nome vazio e email vazio
})

