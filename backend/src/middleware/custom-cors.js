export default function customCors(req, res, next) {
  if (
    req.method === "OPTIONS" &&
    req.path === "/store/customers/password-reset"
  ) {
    res.header("Access-Control-Allow-Origin", process.env.STORE_CORS);
    res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.sendStatus(204);
  } else {
    next();
  }
}