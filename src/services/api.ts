import axios from 'axios';

const API_BASE_URL = 'http://localhost:5050';

export interface Post {
  _id: string;
  productName: string;
  quantity: string;
  price: string;
  aisle: string;
  date: string;
}

export interface Comment {
  text: string;
  author: string;
  date: string;
}

const api = {
  // Get all posts
  getPosts: async (): Promise<Post[]> => {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
  },

  // Get latest posts
  getLatestPosts: async (): Promise<Post[]> => {
    const response = await axios.get(`${API_BASE_URL}/posts/latest`);
    return response.data;
  },

  // Get single post
  getPost: async (id: string): Promise<Post> => {
    const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
    return response.data;
  },

  // Create new post
  createPost: async (post: Omit<Post, '_id' | 'date'>): Promise<Post> => {
    const response = await axios.post(`${API_BASE_URL}/posts`, post);
    return response.data;
  },

  // Add comment to post
  addComment: async (postId: string, comment: Omit<Comment, 'date'>): Promise<Post> => {
    const response = await axios.patch(`${API_BASE_URL}/posts/comment/${postId}`, comment);
    return response.data;
  },

  // Delete post
  deletePost: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/posts/${id}`);
  }
};

export default api; 