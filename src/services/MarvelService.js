export default class MarvelService {
    constructor() {
        this._apiBase = 'https://gateway.marvel.com:443/v1/public/'
        this._baseOffset = 210
    }

    async getResource(url) {
        let result = await fetch(url);

        if(!result.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${result.status}`)
        }

        return await result.json()
    }

    async getAllCharacters(offset = this._baseOffset) {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&apikey=1b005fb9e66fefec2cf364198829e5a3`)
        return res.data.results.map(this._transformCharacter)
    }
    async getCharacter(id) {
        const res = await this.getResource(`${this._apiBase}characters/${id}?apikey=1b005fb9e66fefec2cf364198829e5a3`);
        console.log(res.data.results[0])
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter(char) {
        return {
            name: char.name,
            description: char.description ? char.description.slice(0, 180) + '...' : 'There is no info:(',
            thumbnail: char.thumbnail.path + '.' +char.thumbnail.extension,
            homepage: char.urls[0],
            wiki: char.urls[1],
            id: char.id,
            comics: char.comics.items.slice(0, 10)
        }
    }
}