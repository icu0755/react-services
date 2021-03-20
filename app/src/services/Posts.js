import axios from 'axios';

export default class Posts {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async listPosts() {
        const url = `${this.baseUrl}/posts/`;
        const response = await axios.get(url);
        return response.data;
    }

    async createPost(post) {
        const url = `${this.baseUrl}/posts/`;
        const response = await axios.post(url, post);
        return response.data;
    }
}