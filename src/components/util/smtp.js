/* SmtpJS.com - v2.0.1 */
const Email = {
  send: function(e, o, t, n, a, s, r, c) {
    var d = Math.floor(1e6 * Math.random() + 1),
      i = 'From=' + e
    ;(i += '&to=' + o),
      (i += '&Subject=' + encodeURIComponent(t)),
      (i += '&Body=' + encodeURIComponent(n)),
      void 0 == a.token
        ? ((i += '&Host=' + a),
          (i += '&Username=' + s),
          (i += '&Password=' + r),
          (i += '&Action=Send'))
        : ((i += '&SecureToken=' + a.token),
          (i += '&Action=SendFromStored'),
          (c = a.callback)),
      (i += '&cachebuster=' + d),
      Email.ajaxPost('https://smtpjs.com/v2/smtp.aspx?', i, c)
  },
  sendWithAttachment: function(e, o, t, n, a, s, r, c, d) {
    var i = Math.floor(1e6 * Math.random() + 1),
      m = 'From=' + e
    ;(m += '&to=' + o),
      (m += '&Subject=' + encodeURIComponent(t)),
      (m += '&Body=' + encodeURIComponent(n)),
      (m += '&Attachment=' + encodeURIComponent(c)),
      void 0 == a.token
        ? ((m += '&Host=' + a),
          (m += '&Username=' + s),
          (m += '&Password=' + r),
          (m += '&Action=Send'))
        : ((m += '&SecureToken=' + a.token), (m += '&Action=SendFromStored')),
      (m += '&cachebuster=' + i),
      Email.ajaxPost('https://smtpjs.com/v2/smtp.aspx?', m, d)
  },
  ajaxPost: function(e, o, t) {
    var n = Email.createCORSRequest('POST', e)
    n.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'),
      (n.onload = function() {
        var e = n.responseText
        void 0 != t && t(e)
      }),
      n.send(o)
  },
  ajax: function(e, o) {
    var t = Email.createCORSRequest('GET', e)
    ;(t.onload = function() {
      var e = t.responseText
      void 0 != o && o(e)
    }),
      t.send()
  },
  createCORSRequest: function(e, o) {
    var t = new XMLHttpRequest()
    return (
      'withCredentials' in t
        ? t.open(e, o, !0)
        : 'undefined' != typeof XDomainRequest
          ? (t = new XDomainRequest()).open(e, o)
          : (t = null),
      t
    )
  }
}
export default Email
