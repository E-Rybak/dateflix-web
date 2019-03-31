// Exports the authHeader function from the file. It is publicly available to code accessing AuthHeader.js
export function authHeader() {
  if (localStorage.user){
    var user = JSON.parse(localStorage.user); // Fetch user from localStorage
  }

  // If user and users JWT token exists
  if (user && user.token) {
    // Returns a headers object containing the authorization header with relevant token and content type.
    return "Bearer " + user.token;
  }
  // If no one is logged in, return empty object
  else {
    return "";
  }
}
