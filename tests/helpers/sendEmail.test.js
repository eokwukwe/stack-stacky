import sendEmail from '../../src/helpers/sendEmail';

describe('Send Email Test', () => {
  describe('Send email notification', () => {
    it('should send an email notification successfully', async () => {
      const mailOptions = {
        from: 'we@stack-stacky.com',
        to: 'john@doe.com, jane@doe.com',
        subject: 'This is an email',
        text: 'This is to test that the email is working',
        html: '<h3>This is to test that the email is working</h3>',
      };
      const mail = await sendEmail(mailOptions);

      expect(mail).toBeDefined();
      expect(mail.reject).toHaveLength(0);
    });

    it('should return an error for unsuccessful sending of email', async () => {
      const mailOptions = {
        from: 'we@stack-stacky.com',
        subject: 'This is an email',
        text: 'This is to test that the email is working',
        html: '<h3>This is to test that the email is working</h3>',
      };
      const mail = await sendEmail(mailOptions);

      expect(mail).toBeDefined();
      expect(mail.error).toBe('No recipients defined');
    });
  });
});
