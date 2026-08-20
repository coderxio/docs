/**
 * Loads the Cal.com embed once per session.
 *
 * "Book a Demo" is the primary conversion action on every page and is
 * rendered by the navbar, so the embed is initialized globally here
 * rather than being duplicated in each page component.
 */

declare global {
  interface Window {
    Cal?: (...args: any[]) => void;
  }
}

const EMBED_SRC = 'https://app.cal.com/embed/embed.js';

function initCal() {
  if (typeof window === 'undefined') return;
  if (document.querySelector(`script[src="${EMBED_SRC}"]`)) return;

  (function (C: any, A: string, L: string) {
    const p = (a: any, ar: any) => {
      a.q.push(ar);
    };
    const d = C.document;
    C.Cal =
      C.Cal ||
      function (...args: any[]) {
        const cal = C.Cal;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const s = d.createElement('script');
          s.src = A;
          s.async = true;
          d.head.appendChild(s);
          cal.loaded = true;
        }
        if (args[0] === L) {
          const api: any = (...a: any[]) => {
            p(api, a);
          };
          const namespace = args[1];
          api.q = api.q || [];
          typeof namespace === 'string'
            ? (cal.ns[namespace] = api) && p(api, args)
            : p(cal, args);
          return;
        }
        p(cal, args);
      };
  })(window, EMBED_SRC, 'init');

  window.Cal!('init', { origin: 'https://cal.com' });
  window.Cal!('ui', {
    styles: { branding: { brandColor: '#d52d34' } },
    hideEventTypeDetails: false,
    layout: 'month_view',
  });
}

if (typeof window !== 'undefined') {
  initCal();
}

export {};
