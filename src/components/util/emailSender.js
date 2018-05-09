import Email from './smtp'

export default class EmailSender {
  constructor() {
    this.emailAddr = 'ssthouse@163.com'
    this.username = 'ssthouse@163.com'
    this.password = 'wssst13886195197'
  }

  sendMail(targetMailAddr, subject, body) {
    Email.send(
      this.emailAddr,
      targetMailAddr,
      subject,
      body,
      'smtp.yourisp.com',
      this.username,
      this.password
    )
  }
}
