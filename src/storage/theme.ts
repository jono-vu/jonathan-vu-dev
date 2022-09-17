function changeTheme(theme: string) {
  window.localStorage.setItem("theme", theme);
  window.dispatchEvent(new Event("storage"));
}

export { changeTheme };
