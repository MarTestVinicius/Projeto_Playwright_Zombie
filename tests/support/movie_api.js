
export class MoviesApi {
    constructor(request) {
        this.request = request;

        this.apiBaseUrl = process.env.API_URL || 'http://localhost:3333';
    }

    adicionarFilme(payload) {
        return this.request.post(`${this.apiBaseUrl}/movies`, { data: payload });
    }
}
