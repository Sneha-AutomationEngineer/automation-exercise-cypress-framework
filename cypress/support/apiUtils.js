/**
 * Automation Exercise sometimes returns an HTML page (bot/WAF) with HTTP 200
 * instead of JSON — especially from CI IPs when using cy.request alone.
 */

function parseApiBody(rawBody, status) {
  if (rawBody !== null && typeof rawBody === 'object') {
    return rawBody;
  }

  if (typeof rawBody === 'string') {
    const trimmed = rawBody.trim();
    if (trimmed.startsWith('<')) {
      throw new Error(
        `API returned HTML instead of JSON (status ${status}). ` +
          'The site may be blocking this runner. Body starts with: ' +
          trimmed.slice(0, 80)
      );
    }
    return JSON.parse(trimmed);
  }

  throw new Error(`Unexpected API response body type: ${typeof rawBody}`);
}

/**
 * Open the site once so Cloudflare/WAF cookies exist in the browser.
 */
function warmUpApiSession() {
  cy.visit('/');
}

/**
 * Call APIs through the browser fetch stack (same cookies as cy.visit).
 * More reliable in GitHub Actions than bare cy.request against this site.
 */
function apiRequest({ method = 'GET', url, body, form = false, qs }) {
  const absoluteUrl = new URL(url, Cypress.config('baseUrl'));

  if (qs) {
    Object.entries(qs).forEach(([key, value]) => {
      absoluteUrl.searchParams.set(key, value);
    });
  }

  return cy.window().then((win) => {
    const headers = {};
    let payload = undefined;

    if (body !== undefined) {
      if (form) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        payload = new URLSearchParams(body).toString();
      } else {
        headers['Content-Type'] = 'application/json';
        payload = JSON.stringify(body);
      }
    }

    return win
      .fetch(absoluteUrl.toString(), {
        method,
        headers,
        body: payload,
        credentials: 'include',
      })
      .then(async (res) => {
        const text = await res.text();
        return {
          status: res.status,
          body: text,
        };
      });
  }).then((response) => {
    // Cypress chain: wrap so callers can keep using .then()
    return cy.wrap(response, { log: false });
  });
}

function apiRequestJson(options) {
  return apiRequest(options).then((response) => {
    expect(response.status).to.eq(200);
    return parseApiBody(response.body, response.status);
  });
}

module.exports = {
  parseApiBody,
  warmUpApiSession,
  apiRequest,
  apiRequestJson,
};
