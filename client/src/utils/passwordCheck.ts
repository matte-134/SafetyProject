export const passwordCheck = (password1: string, password2: string) => {
  if (password1 === password2) {
    return true;
  } else {
    return false;
  }
};
