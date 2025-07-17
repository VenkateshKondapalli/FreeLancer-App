const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
(async () => {
  try {
    await transporter.verify();
    console.log("-----Mail service is Ready-----");
  } catch (err) {
    console.log("-----Error in Mail Service-----");
    console.log("error is : ", err.message);
  }
})();

const sendOtpMail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: '"Venkatesh" <venkatesh@gmail.com>',
      to: email,
      subject: "Otp Verification for platform",
      html: `
                <html>
                    <head>
                        <style>
                            main{
                                height: 500px;
                                width: 500px;
                                margin: auto;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                background-color: black;
                                color: white;
                                font-size: 28px;
                            }
                        </style>
                    </head>
                    <body>
                        <main>
                            <h2>Your otp is: ${otp}</h2>
                        </main>
                    </body>
                </html>
            `,
    });
    console.log("---> email sent!");
  } catch (err) {
    console.log("----Error in sending Mail----: ", err.message);
    throw "Error in sending Email!";
  }
};

module.exports = { sendOtpMail };
