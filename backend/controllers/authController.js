import jwt from "jsonwebtoken";

import config from "../config/config.js";
const userAuthKey = config.authKey;

export const checkAccessToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ Error: "Access denied: Unauthorized user" });
    } else {
      const token = authHeader.replace("Bearer ", "");
      jwt.verify(token, userAuthKey, (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Access Token Expired" });
          }
          return res.status(401).json({ error: err });
        } else {
          console.log("User", decoded);
          req.user = decoded;
          next();
        }
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

export const getRequestToken = (req, res, next) => {
  try {
    if (req?.headers["authorization"]) {
      const authHeader = req.headers["authorization"];
      if (authHeader.startsWith("Bearer ")) {
        const token = authHeader.replace("Bearer ", "");
        return token;
      } else {
        console.error("Authorization header is not formatted correctly");
        return null;
      }
    } else {
      console.error("Authorization header is missing");
    }
  } catch (error) {
    console.log("!!!^^^ ERROR: ", error);
    return null;
  }
};

export const checkRefreshToken = (req, res, next) => {
  try {
    const authHeader = req.headers["refresh"];
    if (!authHeader || !authHeader.startsWith("Refresh")) {
      return res
        .status(401)
        .json({ Error: "Access denied: Unauthorized user" });
    } else {
      const token = authHeader.replace("Refresh ", "");
      jwt.verify(token, userAuthKey, (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return res.status(403).json({ error: "Refresh Token Expired" });
          }
          return res.status(401).json({ error: "Invalid token" });
        } else {
          const accessToken = jwt.sign({ result: email }, "authkey", {
            expiresIn: "1d",
          });
          req.user = accessToken;
          next();
        }
      });
    }
  } catch (error) {
    console.log({ Error: error });
    return null;
  }
};
