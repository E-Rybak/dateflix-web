import Axios from "axios";
import { authHeader } from "./AuthHeader.js";

const client = Axios.create({
  baseURL: "http://localhost:5000/api/admin/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: authHeader()
  }
});

export default {
  getAll() {
    return client.get("/getall");
  },
  doBanEmail(email) {
    let emailToBan = {
      email: email
    };
    console.log(JSON.stringify(emailToBan))
    // Send email as an object instead of plain string for proper JSON serialization
    return client.post("/ban", JSON.stringify(emailToBan)).catch(error => {
      console.log(error.message);
    });
  }
};
