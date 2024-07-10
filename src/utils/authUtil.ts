export function getCookieValue(cookieName: string): string {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + "=")) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return "";
}

export function setCookie(name: string, value: string, seconds: number) {
  let expires = "";
  if (seconds) {
      expires = "; max-age=" + seconds;
  }
  document.cookie = name + "=" + value + expires + "; SameSite=Strict; path=/";
}
