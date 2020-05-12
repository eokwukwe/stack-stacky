/**
 * @description creates template for sending emails
 * @returns object of temapltes for sending emails;
 */
const emailTemplates = {
  answerNotify: {
    from: 'no-reply@stack-stacky.com',
    subject: 'Answer notification',
    html: (title) => `
        <h1 style="color: #6C54EC"> Hello</h1>
        <p style="color:black">
           The question
           <span style="text-transform: capitalize; font-weight: bold">
              ${title}
            </span>
           just received a new answer.
        </p>
        `,
  },
};

export default emailTemplates;
