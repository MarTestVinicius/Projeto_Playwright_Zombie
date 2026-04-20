const { expect } = require('@playwright/test');
const { Componentes } = require('../components/Components');

export class TvshowPage {

    constructor(page) {
        this.page = page;
        this.componentes = new Componentes(this.page);
    }

    async IrPaginaInicialTVShowAdmin() {
        await this.page.locator('a[href="/admin/tvshows"]').click();//clicar no link para acessar a página inicial de TV Show do administrador
    }

    async AdicionarNovoTVShow() {
        await this.page.locator('a[href="/admin/tvshows/register"]').click(); //clicar no link para adicionar um novo show
        const titluloFormularioCadastroFilme = this.page.getByText('Cadastrar nova Série')//localizar o título do formulário de cadastro de show usando um seletor de texto
        await expect(titluloFormularioCadastroFilme).toBeVisible();//verificar se o título do formulário de cadastro de show está visível, indicando que a página de cadastro foi carregada corretamente
    }

    async PreencherformNovoTVShow(title, overview, company, release_year, cover, featured, season) {
        await this.page.getByLabel('Titulo da série').fill(title);//preencher o campo de título do filme
        await this.page.getByLabel('Sinopse').fill(overview);//preencher o campo de sinopse do filme

        //encontrar e adicionar a empresa no dropdown
        await this.page.locator('#select_company_id .react-select__indicator').click();//clicar no campo de seleção de empresa para abrir o dropdown
        await this.page.locator('.react-select__option').filter({ hasText: company }).click();//selecionar a empresa desejada no dropdown

        //encontrar e adicionar o ano de lançamento no dropdown
        await this.page.locator('#select_year .react-select__indicator').click();//clicar no campo de seleção de ano para abrir o dropdown
        await this.page.locator('.react-select__option').filter({ hasText: release_year }).click();//selecionar o ano desejado no dropdown

        //adicionar a temporada da TvShow
        await this.page.getByLabel('Temporadas').fill(season);

        //encontrar e adicionar o cover do filme
        await this.page.locator('#cover')
            .setInputFiles('tests/support/fixtures' + cover);//enviar o arquivo de cover para o campo de upload    

        //adicionar conteúdo destaque ou não
        if (featured) {
            await this.page.locator('.featured .react-switch').click();//habilita o conteúdo destaque.
        }
    }

    async PreencherCampoTemporadasValorErro(title, overview, company, release_year, cover, featured) {

        await this.page.getByLabel('Titulo da série').fill(title);//preencher o campo de título do filme
        await this.page.getByLabel('Sinopse').fill(overview);//preencher o campo de sinopse do filme

        //encontrar e adicionar a empresa no dropdown
        await this.page.locator('#select_company_id .react-select__indicator').click();//clicar no campo de seleção de empresa para abrir o dropdown
        await this.page.locator('.react-select__option').filter({ hasText: company }).click();//selecionar a empresa desejada no dropdown

        //encontrar e adicionar o ano de lançamento no dropdown
        await this.page.locator('#select_year .react-select__indicator').click();//clicar no campo de seleção de ano para abrir o dropdown
        await this.page.locator('.react-select__option').filter({ hasText: release_year }).click();//selecionar o ano desejado no dropdown

        //adicionar a temporada da TvShow
        await this.page.getByLabel('Temporadas').fill('season');

        //encontrar e adicionar o cover do filme
        await this.page.locator('#cover')
            .setInputFiles('tests/support/fixtures' + cover);//enviar o arquivo de cover para o campo de upload    

        //adicionar conteúdo destaque ou não
        if (featured) {
            await this.page.locator('.featured .react-switch').click();//habilita o conteúdo destaque.
        }
    }

    async EnviarFormularioCadastrarNovoTVShow() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click();//clicar no botão de cadastro
    }

    async ValidarComponenteDeTVShowEnviadoSucesso(TVShowTitle) {
        const errorMessage = `A série '${TVShowTitle}' foi adicionada ao catálogo.`;
        await this.componentes.ValidarPopupMensagem(errorMessage);
    }

    async ValidarComponenteDeTVShowEnviadoDuplicidade(title) {
        const errorMessage = `O título  '${title}' já consta em nosso catálogo`;
        await this.componentes.ValidarPopupMensagem(errorMessage);
    }


    async ValidarCamposObrigatoriosVazios() {
        const errorMessage = [
            'Campo obrigatório',
            'Campo obrigatório',
            'Campo obrigatório',
            'Campo obrigatório',
            'Campo obrigatório (apenas números)'];
        await this.componentes.ValidarAlertMensagem(errorMessage);
    }

    async ValidarCampoTemporadasValorErro() {
        const errorMessage = 'Campo obrigatório (apenas números)';
        await this.componentes.ValidarAlertMensagem(errorMessage);
    }

    async RemoverTVShowDaLista(title) {

        //await this.page.locator(`//td[text()='${title}']/..//button`).click();//localizar o botão de remover do TV Show específico usando XPath e clicar nele
        await this.page.getByRole('row', { name: title }).getByRole('button').click();//uma outra alternativa para fazer a mesma ação acima.
        await this.page.locator('.confirm-removal').click();//confirmar a remoção do TV Show clicando no botão de confirmação
    }

    async ValidarTVShowRemovidoSucesso(title) {
        const errorMessage = 'Série removida com sucesso.';
        await this.componentes.ValidarPopupMensagem(errorMessage);
    }

    async BuscarTVShowPeloUmTermo(palavra) {
        await this.page.getByPlaceholder('Busque pelo nome').fill(palavra);//preencher o campo de busca com a palavra desejada
        await this.page.locator('.actions button').click();//clicar no botão de busca para iniciar a pesquisa        
    }

    async ValidarResultadoPesquisaTvShow(palavra) {
        await this.page.waitForLoadState('networkidle');//esperar a página carregar completamente
        const row = await this.page.getByRole('row').locator('.title');//verificar se o resultado da pesquisa contém o filme esperado, indicando que a busca foi realizada com sucesso
        await expect(row).toContainText(palavra);
    }
}

