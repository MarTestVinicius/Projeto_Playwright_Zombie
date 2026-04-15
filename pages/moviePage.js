const { expect } = require('@playwright/test');
const { Toast } = require('../components/Components');

export class MoviePage {

    constructor(page) {
        this.page = page;
        this.toast = new Toast(this.page);
    }


    async ValidarLoginAdminSucesso() {
        await this.page.waitForLoadState('networkidle');//esperar a página carregar completamente
        //const logoutButton = this.page.getByText('Sair');//localizar o botão de logout usando um seletor de texto
        const logoutbutton2 = this.page.locator('a[href="/logout"]');//localizar o botão de logout usando um seletor CSS
        await expect(logoutbutton2).toBeVisible();//verificar se o botão de logout está visível, indicando que o login foi bem-sucedido
        await expect(this.page).toHaveURL(/.*admin/);//verificar se a URL contém "/admin", indicando que o usuário foi redirecionado para a página de administração após o login bem-sucedido
    }

    async AdicionarNovoFilme() {
        await this.page.locator('a[href="/admin/movies/register"]').click(); //clicar no link para adicionar um novo filme
        const titluloFormularioCadastroFilme = this.page.getByText('Cadastrar novo Filme')//localizar o título do formulário de cadastro de filme usando um seletor de texto
        await expect(titluloFormularioCadastroFilme).toBeVisible();//verificar se o título do formulário de cadastro de filme está visível, indicando que a página de cadastro foi carregada corretamente
    }

     async PreencherformNovoFilme(title,overview,company,release_year) {
        await this.page.getByLabel('Titulo').fill(title);//preencher o campo de título do filme
        await this.page.getByLabel('Sinopse').fill(overview);//preencher o campo de sinopse do filme

        //encontrar e adicionar a empresa no dropdown
        await this.page.locator('#select_company_id .react-select__indicator').click();//clicar no campo de seleção de empresa para abrir o dropdown
        await this.page.locator('.react-select__option').filter({ hasText: company }).click();//selecionar a empresa desejada no dropdown

         //encontrar e adicionar o ano de lançamento no dropdown
        await this.page.locator('#select_year .react-select__indicator').click();//clicar no campo de seleção de ano para abrir o dropdown
        await this.page.locator('.react-select__option').filter({ hasText: release_year }).click();//selecionar o ano desejado no dropdown
     }

     async EnviarFormularioCadastrarNovoFilme() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click();//clicar no botão de cadastro
     }

     async ValidarToastDeFilmeEnviadoSucesso() {
        const errorMessage = 'Cadastro realizado com sucesso!';
       await this.toast.ValidarToastMensagem(errorMessage);
    }
}

