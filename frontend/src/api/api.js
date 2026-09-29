/**
 * Centralized API Configuration & Client
 * 
 * VITE_API_URL must be defined via environment variables:
 * - Local development: configured in frontend/.env
 * - Production: configured in deployment settings (e.g. Vercel dashboard)
 */

const RAW_API_URL = import.meta.env.VITE_API_URL;

/**
 * Returns the normalized API base URL or throws an error if unconfigured.
 * @returns {string}
 */
export function getApiUrl() {
  if (!RAW_API_URL) {
    throw new Error(
      "Configuration Error: VITE_API_URL is not defined. Please set VITE_API_URL in your environment variables (.env locally or in your deployment dashboard)."
    );
  }
  return String(RAW_API_URL).trim().replace(/^["']|["']$/g, "").replace(/\/+$/, "");
}

// Normalized API base URL (empty string if unconfigured, never silently falls back)
export const API_URL = RAW_API_URL
  ? String(RAW_API_URL).trim().replace(/^["']|["']$/g, "").replace(/\/+$/, "")
  : "";

/**
 * Parses response JSON with graceful error handling and fallback for HTML error pages.
 * @param {Response} response 
 * @returns {Promise<any>}
 */
export async function parseResponseData(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }
  try {
    const text = await response.text();
    if (!text) return null;
    // Strip HTML tags if an HTML error page is returned (e.g. Render / Cloudflare gateway error)
    const cleanText = text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return { detail: cleanText.slice(0, 250) };
  } catch {
    return null;
  }
}

/**
 * Fetch available commodities list from backend
 * Endpoint: GET /commodities
 */
export async function fetchCommodities() {
  const baseUrl = getApiUrl();
  const response = await fetch(`${baseUrl}/commodities`);
  const data = await parseResponseData(response);

  if (!response.ok) {
    const detail = data?.detail || response.statusText || "Request failed";
    throw new Error(`Failed to load commodities (HTTP ${response.status}): ${detail}`);
  }

  return data;
}

/**
 * Submit packaging recommendation parameters to backend
 * Endpoint: POST /recommend
 * @param {object} payload
 */
export async function fetchRecommendation(payload) {
  const baseUrl = getApiUrl();
  const response = await fetch(`${baseUrl}/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await parseResponseData(response);

  if (!response.ok) {
    const detail = data?.detail || response.statusText || "Unable to generate recommendation.";
    throw new Error(`HTTP ${response.status}: ${detail}`);
  }

  if (!data) {
    throw new Error("Server returned an empty or invalid response.");
  }

  return data;
}

export default {
  API_URL,
  getApiUrl,
  parseResponseData,
  fetchCommodities,
  fetchRecommendation,
};
