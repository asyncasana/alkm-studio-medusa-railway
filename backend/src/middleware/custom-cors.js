export default function customCors(req, res, next) {
  if (
    req.method === "OPTIONS" &&
    req.path === "/store/custom/password-reset"
  ) {
    res.header("Access-Control-Allow-Origin", process.env.STORE_CORS);
    res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-publishable-api-key");
    res.sendStatus(204);
  } else {
    next();
  }
}