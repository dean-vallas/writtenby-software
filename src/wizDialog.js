/* globals window */
/* eslint-disable no-underscore-dangle */
try {
    if (window.top !== window) {
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.top.__REACT_DEVTOOLS_GLOBAL_HOOK__;
        window.__VUE_DEVTOOLS_GLOBAL_HOOK__ = window.top.__VUE_DEVTOOLS_GLOBAL_HOOK__;
        window.top.__VUE_DEVTOOLS_CONTEXT__ = window.document;
    }
} catch (e) {
    // eslint-disable-next-line no-console
    console.warn('unable to connect to top frame for connecting dev tools');
}
