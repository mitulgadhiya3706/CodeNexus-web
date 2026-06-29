const normalizeBaseUrl = (value) => {
  if (!value) return "";

  const trimmed = value.trim().replace(/\/+$/, "");

  if (/^h+https?:\/\//i.test(trimmed)) {
    return trimmed.replace(/^h+/, "").replace(/^(https?:\/\/)/i, "$1");
  }

  if (!/^https?:\/\//i.test(trimmed)) {
    return `http://${trimmed}`;
  }

  return trimmed;
};

const getBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (configuredUrl) {
    return normalizeBaseUrl(configuredUrl);
  }

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "https://codenexus-gzpg.onrender.com";
    }
  }

  return "https://codenexus-gzpg.onrender.com";
};

export const BASE_URL = getBaseUrl();