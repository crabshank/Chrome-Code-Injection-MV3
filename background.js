'use strict';

try {

async function createOffscreen() {
  await chrome.offscreen.createDocument({
	url: 'offscreen.html',
	reasons: ['BLOBS'],
	justification: 'Keep service worker running',
  }).catch(() => {});
}

function createOffscreen2() {
	if(createOffscreen!==null){
		createOffscreen();
		createOffscreen=null;
	}
}

chrome.runtime.onStartup.addListener(createOffscreen2);
createOffscreen2();

const RULE_ID_PREFIX = 'site-injector-rule-';

function parseStoredList(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value !== 'string') {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function loadRules() {
  const items = await chrome.storage.local.get(null);

  const addrs = parseStoredList(items.addrs_list);
  const csses = parseStoredList(items.slc_list);
  const jss = parseStoredList(items.fcn_list);

  const rules = [];
  const length = Math.max(addrs.length, csses.length, jss.length);

  for (let i = 0; i < length; ++i) {
    const addr = String(addrs[i] ?? '').trim();
    const css = String(csses[i] ?? '').trim();
    const js = String(jss[i] ?? '').trim();

    if (addr && (css || js)) {
      rules.push({ addr, css, js });
    }
  }

  return rules;
}

function buildUserScriptCode(rule, index) {
  const addrJson = JSON.stringify(rule.addr);
  const cssJson = JSON.stringify(rule.css);
  const hasJsJson = JSON.stringify(Boolean(rule.js));
  const indexJson = JSON.stringify(String(index));
  const jsBody = rule.js || '';

  /*
    This code is injected as a user script by chrome.userScripts.register().

    It is not evaluated by the extension itself.

    The wildcard matcher below is intentionally simple and predictable:
      - split the pattern on '*'
      - require each non-empty part to appear in order in the URL
      - match case-insensitively

    This is closer to your old behaviour than trying to convert your
    arbitrary '*' patterns into Chrome match patterns.
  */

  return `
(() => {
  "use strict";

  function matchesWildcard(pattern, url) {
    if (!pattern) {
      return false;
    }

    const parts = String(pattern)
      .split("*")
      .filter(part => part !== "");

    if (parts.length === 0) {
      return true;
    }

    const haystack = String(url).toLowerCase();
    let cursor = 0;

    for (const part of parts) {
      const needle = String(part).toLowerCase();
      const found = haystack.indexOf(needle, cursor);

      if (found === -1) {
        return false;
      }

      cursor = found + needle.length;
    }

    return true;
  }

  function injectCss(cssText) {
    if (!cssText) {
      return;
    }

    const style = document.createElement("style");
    style.textContent = cssText;
    style.dataset.siteInjectorRule = ${indexJson};

    const parent = document.head || document.documentElement;
    if (parent) {
      parent.appendChild(style);
    }
  }

  function runRule() {
    if (!matchesWildcard(${addrJson}, location.href)) {
      return;
    }

    injectCss(${cssJson});

    if (${hasJsJson}) {
      try {
        (function () {
${jsBody}
        })();
      } catch (error) {
        console.error("[Site Injector] JS rule " + ${indexJson} + " failed:", error);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runRule, { once: true });
  } else {
    runRule();
  }
})();
`;
}

async function syncUserScripts() {
  if (!chrome.userScripts || typeof chrome.userScripts.register !== 'function') {
    console.warn(
      '[Site Injector] chrome.userScripts is unavailable. ' +
      'Enable "Allow user scripts" for this extension in chrome://extensions.'
    );
    return;
  }

  const rules = await loadRules();

  try {
    await chrome.userScripts.unregister();
  } catch (error) {
    console.warn('[Site Injector] unregister failed:', error);
  }

  if (rules.length === 0) {
    return;
  }

  const scripts = rules.map((rule, index) => ({
    id: `${RULE_ID_PREFIX}${index}`,
    matches: ['<all_urls>'],
    runAt: 'document_idle',
    world: 'USER_SCRIPT',
    js: [
      {
        code: buildUserScriptCode(rule, index)
      }
    ]
  }));

  try {
    await chrome.userScripts.register(scripts);
  } catch (error) {
    console.error('[Site Injector] register failed:', error);
  }
}

chrome.runtime.onInstalled.addListener(syncUserScripts);
chrome.runtime.onStartup.addListener(syncUserScripts);

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local') {
    syncUserScripts();
  }
});

}catch (e) {
  console.error(e);
}