export function getUser() {
  const user = localStorage.getItem("token");
  return user ? { token: user } : null;
}

export function saveUser(user) {
  localStorage.setItem("token", user.token);
}