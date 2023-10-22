const API_BASE_URL = 'http://localhost'; // Your API's base URL

const API_ROUTES = {
  USERS: {
    GET_USERS: `${API_BASE_URL}/users`,
    CREATE_USER: `${API_BASE_URL}/users`,
    // Add more user-related routes here
  },
  POSTS: {
    GET_POSTS: `${API_BASE_URL}/posts`,
    CREATE_POST: `${API_BASE_URL}/posts`,
    // Add more post-related routes here
  },
  // Add more resource-specific routes here
};

export default API_ROUTES;
