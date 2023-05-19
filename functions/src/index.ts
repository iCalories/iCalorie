/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {HttpsError, onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import axios from "axios";
import * as dotenv from "dotenv";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

dotenv.config();

export const requestCompletion = onCall(({data}) => {
  const body = data;
  logger.debug("Post body", body);
  const url = "https://api.openai.com/v1/completions";
  const API_KEY = process.env.API_KEY;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`,
  };
  return axios
    .post(url, body, {headers: headers})
    .then((res) => res.data)
    .catch((error) => {
      throw new HttpsError("unknown", error.message, error);
    });
});
