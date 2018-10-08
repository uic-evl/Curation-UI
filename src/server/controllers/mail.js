const sgMail = require('@sendgrid/mail');

exports.sendWelcome = function (req, res, next) {
  sgMail.setApiKey('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');

  const msg = {
    to: 'jtrell2@uic.edu',
    from: 'no-reply@devcuration.com',
    subject: 'Welcome mail test',
    text: 'this is a sample email',
    html: '<strong>Hi!</strong>',
  };

  sgMail.send(msg);
  res.send({"message": "ok"});
}