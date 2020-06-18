"use strict";

const cors = require("cors");

const whiteListEnv = process.env.CORS_WHITE_LIST;
const whiteList = whiteListEnv ? String(whiteListEnv).split(",") : null;

const corsOptions = {
  origin: !whiteList
    ? "*"
    : function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
};

module.exports = cors(corsOptions);
