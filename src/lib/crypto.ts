import { api } from "@/services/api";

import { Tokens } from "./tokens";
import Cookies from "js-cookie";

let cachedPublicKey: string | null = null;

export async function getPublicKey(): Promise<string> {
  if (cachedPublicKey) return cachedPublicKey;

  const cookie = Cookies.get(Tokens.RSA_PUBLIC_KEY);

  if (cookie) {
    cachedPublicKey = cookie;
    return cookie;
  }

  const { data: response } = await api.get("/auth/public-key");
  cachedPublicKey = response.data.publicKey;

  if (!cachedPublicKey) {
    throw new Error("Public key not available");
  }

  Cookies.set(Tokens.RSA_PUBLIC_KEY, cachedPublicKey, {
    expires: 1,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return cachedPublicKey;
}

export async function encrypt(
  decrypted: string,
  publicKey: string
): Promise<string> {
  try {
    const keyBuffer = pemToArrayBuffer(publicKey);

    const importedKey = await window.crypto.subtle.importKey(
      "spki",
      keyBuffer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      false,
      ["encrypt"]
    );

    const encrypted = await window.crypto.subtle.encrypt(
      { name: "RSA-OAEP" },
      importedKey,
      new TextEncoder().encode(decrypted)
    );

    return Buffer.from(encrypted).toString("base64");
  } catch {
    throw new Error("Failed to encrypt data");
  }
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const base64 = pem
    .replace("-----BEGIN PUBLIC KEY-----", "")
    .replace("-----END PUBLIC KEY-----", "")
    .replace(/\s/g, "");

  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
}
