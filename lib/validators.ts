export function validateEmail(email: string): string | null {
  const re = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  if (!email || !re.test(email)) return "Enter a valid email address";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password || password.length < 8) return "Password must be at least 8 characters";
  const upper = /[A-Z]/.test(password);
  const lower = /[a-z]/.test(password);
  const digit = /[0-9]/.test(password);
  if (!(upper && lower && digit)) return "Use upper, lower case letters and a number";
  return null;
}
