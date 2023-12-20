import axios from "axios";

export const signUpMutationFn = async ({ name, email, password }) => {
     console.log(name, email, password);
     const response = await axios.post('http://127.0.0.1:3000/auth/signup', { name: name, email: email, password: password });
     return response;
}
