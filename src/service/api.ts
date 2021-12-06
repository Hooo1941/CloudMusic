import axios from 'axios';
// axios.defaults.baseURL = 'http://120.76.192.143:3000/';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

export async function search() {
  try {
    const response = await axios.get('/search?keywords=海阔天空');
    return response.data;
  } catch (error) {
    return error;
  }
}
