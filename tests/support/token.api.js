import { expect } from '@playwright/test';

export class AuthApi {
    constructor(request) {
        this.request = request;
    }
    async loginToken(email, password) {
        return await this.request.post('http://localhost:3333/sessions', {
            data: { email, password }
        });
    }

    async setToken() {
        const responseToken = await this.loginToken('admin@zombieplus.com', 'pwd123');
        expect(responseToken.ok()).toBeTruthy();
        const body = JSON.parse(await responseToken.text());
        const token = body.token;
        return token;
    }

    async getCompanyIdByName(companyName) {
        const response = await this.request.get('http://localhost:3333/companies', {
            headers:
            {
                Authorization: `Bearer ${await this.setToken()}`
            },
            params: {
                name: companyName
            },
        })
        expect(response.ok()).toBeTruthy();
        const body = JSON.parse(await response.text());
        return body.data[0].id;
    }


    async postMovie(movie) {
        const companyId = await this.getCompanyIdByName(movie.company);
        const response = await this.request.post('http://localhost:3333/movies', {
            headers:
            {
                Authorization: `Bearer ${await this.setToken()}`,
                contentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: companyId,
                release_year: movie.release_year,
                featured: movie.featured,
            },
        })
    }

    async postTVShow(tvshow) {
        const companyId = await this.getCompanyIdByName(tvshow.company);
        const response = await this.request.post('http://localhost:3333/tvshows', {
            headers:
            {
                Authorization: `Bearer ${await this.setToken()}`,
                contentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: tvshow.title,
                overview: tvshow.overview,
                company_id: companyId,
                release_year: tvshow.release_year,
                featured: tvshow.featured,
                seasons: tvshow.season
            },
        })
    }

    async AdicionarLeadApi(data) {
        // Criar um lead diretamente via API para garantir que o email já exista
        const response = await this.request.post('http://localhost:3333/leads', { data: data });
        expect(response.status()).toBe(201); // Verificar se o lead foi criado com sucesso
    }
}    