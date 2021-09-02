function decodeUnicodeBase64(str: string) {
  return decodeURIComponent(escape(window.atob( str )));
}



function encodeUnicodeBase64(str: string): string {
  return window.btoa(unescape(encodeURIComponent( str )));
}


export {decodeUnicodeBase64, encodeUnicodeBase64};