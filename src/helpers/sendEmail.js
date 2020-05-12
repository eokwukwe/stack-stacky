import nodemailer from 'nodemailer';

import config from '../config';

const sendEmail = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  });

  try {
    const mail = await transporter.sendMail(mailOptions);
    return mail;
  } catch (e) {
    console.log(e);
    return { error:  e.message  };
  }
};

export default sendEmail;
