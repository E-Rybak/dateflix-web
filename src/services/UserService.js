import Axios from "axios";
import { authHeader } from "./AuthHeader.js";

// Instance of an Axios http client. Used to send requests to the API.
const guestClient = Axios.create({
  baseURL: "http://dateflix.captainanderz.com/api/users/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

const client = Axios.create({
  baseURL: "http://dateflix.captainanderz.com/api/users/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: authHeader()
  }
});

// Public functions available to code accessing UserService.
export default {
  // Returns all users
  getAll() {
    return client.get("/getall");
  },

  // Registers a user on the API.
  register(user) {
    return guestClient.post("/register", user);
  },

  // Authenticates the user on the API.
  authenticate(credentials) {
    return guestClient.post("/authenticate", credentials).then(response => {
      // If response is OK
      if (response.status == 200) {
        localStorage.user = JSON.stringify(response.data); // Add the user object to localStorage. This object also contains the JSON Web Token used for authenticated requests.
      }
    });
  }
};
