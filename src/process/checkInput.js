function isEmail(value) {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return !(!value || regex.test(value) === false);
}
function isPassValid(value) {
  return value.length >= 6;
}
function isConfirmPass(confirm, pass) {
  return confirm.length > 0 && confirm === pass;
}
function isNotEmrty(value) {
  return value.length <= 0;
}
export { isEmail, isPassValid, isConfirmPass, isNotEmrty };
