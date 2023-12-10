const ok = 200;
const created = 201;
const badRequest = 400;
const unauthorized = 401;
const forbidden = 403;
const notFound = 404;
const conflict = 409;
const internalServerError = 500;
const duplicate = 11000;
const isCyrillic = /^[?!,.-яА-ЯёЁa-zA-Z0-9\s'«»:–&-ё—]+$/;
const isEnglish = /^[?!,.-яА-ЯёЁa-zA-Z0-9\s'«»:–&-ё—]+$/;
const filmYear = /^(19[0-9][0-9]|20[0-1][0-9]|202[0-4])$/;

module.exports = {
  ok,
  created,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  internalServerError,
  duplicate,
  isCyrillic,
  isEnglish,
  filmYear,
};
