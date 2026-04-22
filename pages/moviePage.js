import { expect } from '@playwright/test';
import { Componentes } from '../components/Components';
import AxeBuilder from '@axe-core/playwright';

export class MoviePage {

    constructor(page) {
        this.page = page;
        this.componentes = new Componentes(this.page);
    }


    async ValidarLoginAdminSucesso() {
        await this.page.waitForLoadState('networkidle');//esperar a página carregar completamente
        //const logoutButton = this.page.getByText('Sair');//localizar o botão de logout usando um seletor de texto
        const logoutbutton2 = this.page.locator('a[href="/logout"]');//localizar o botão de logout usando um seletor CSS
        await expect(logoutbutton2).toBeVisible();//verificar se o botão de logout está visível, indicando que o login foi bem-sucedido
        await expect(this.page).toHaveURL(/.*admin/);//verificar se a URL contém "/admin", indicando que o usuário foi redirecionado para a página de administração após o login bem-sucedido

        const wellComeMessage = this.page.locator('.logged-user')//localizar a mensagem de boas-vindas
        await expect(wellComeMessage).toHaveText('Olá, Admin');//validando a mensagem de boas vindas para o usuário admin.
    }

    async AdicionarNovoFilme() {
        await this.page.locator('a[href="/admin/movies/register"]').click(); //clicar no link para adicionar um novo filme
        const titluloFormularioCadastroFilme = this.page.getByText('Cadastrar novo Filme')//localizar o título do formulário de cadastro de filme usando um seletor de texto
        await expect(titluloFormularioCadastroFilme).toBeVisible();//verificar se o título do formulário de cadastro de filme está visível, indicando que a página de cadastro foi carregada corretamente
    }

    async PreencherformNovoFilme(title, overview, company, release_year, cover, featured) {
        await this.page.getByLabel('Titulo do filme').fill(title);//preencher o campo de título do filme
        await this.page.getByLabel('Sinopse').fill(overview);//preencher o campo de sinopse do filme

        //encontrar e adicionar a empresa no dropdown
        await this.page.locator('#select_company_id .react-select__indicator').click();//clicar no campo de seleção de empresa para abrir o dropdown
        await this.page.locator('.react-select__option').filter({ hasText: company }).click();//selecionar a empresa desejada no dropdown

        //encontrar e adicionar o ano de lançamento no dropdown
        await this.page.locator('#select_year .react-select__indicator').click();//clicar no campo de seleção de ano para abrir o dropdown
        await this.page.locator('.react-select__option').filter({ hasText: release_year }).click();//selecionar o ano desejado no dropdown

        //encontrar e adicionar o cover do filme
        await this.page.locator('#cover')
            .setInputFiles('tests/support/fixtures' + cover);//enviar o arquivo de cover para o campo de upload    

        //adicionar conteúdo destaque ou não
        if (featured) {
            await this.page.locator('.featured .react-switch').click();//habilita o conteúdo destaque.
        }
    }

    async EnviarFormularioCadastrarNovoFilme() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click();//clicar no botão de cadastro
    }

    async ValidarComponenteDeFilmeEnviadoSucesso() {
        const errorMessage = 'adicionado ao catálogo.';
        await this.componentes.ValidarPopupMensagem(errorMessage);
    }

    async ValidarComponenteDeFilmeEnviadoDuplicidade(title) {
        const errorMessage = `O título  '${title}' já consta em nosso catálogo`;
        await this.componentes.ValidarPopupMensagem(errorMessage);
    }


    async ValidarCamposObrigatoriosVazios() {
        const errorMessage = [
            'Campo obrigatório',
            'Campo obrigatório',
            'Campo obrigatório',
            'Campo obrigatório'];
        await this.componentes.ValidarAlertMensagem(errorMessage);
    }

    async RemoverFilmeDaLista(title) {

        //await this.page.locator(`//td[text()='${title}']/..//button`).click();//localizar o botão de remover do filme específico usando XPath e clicar nele
        await this.page.getByRole('row', { name: title }).getByRole('button').click();//uma outra alternativa para fazer a mesma ação acima.
        await this.page.locator('.confirm-removal').click();//confirmar a remoção do filme clicando no botão de confirmação
    }

    async ValidarFilmeRemovidoSucesso(title) {
        const errorMessage = 'Filme removido com sucesso.';
        await this.componentes.ValidarPopupMensagem(errorMessage);
    }

    async BuscarFilmePeloUmTermo(palavra) {
        await this.page.getByPlaceholder('Busque pelo nome').fill(palavra);//preencher o campo de busca com a palavra desejada
        await this.page.locator('.actions button').click();//clicar no botão de busca para iniciar a pesquisa        
    }

    async ValidarResultadoPesquisa(palavra) {
        const row = await this.page.getByRole('row').locator('.title');//verificar se o resultado da pesquisa contém o filme esperado, indicando que a busca foi realizada com sucesso
        await expect(row).toContainText(palavra);
    }

    async ValidarAcessibilidadeMoviePage() {
        // Run accessibility scan
        const results = await new AxeBuilder({ page: this.page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();

        // Assert no violations were found
        expect(results.violations).toEqual([]);
    }
}

