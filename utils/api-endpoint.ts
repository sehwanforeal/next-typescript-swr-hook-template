const baseUrl = "https://jsonplaceholder.typicode.com";

export const postListAPI = () => `${baseUrl}/posts`;

export const postAPI = (id: number) => `${baseUrl}/posts/${id}`;
