export function VerificationEmail(username, otp) {
	return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Email Verification</title>
   
<style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f7f9fb;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #eaeaea;
      }
      .header h1 {
        margin: 0;
        color: #4CAF50;
        font-size: 26px;
      }
      .content {
        text-align: center;
        margin-top: 20px;
      }
      .content p {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 10px;
      }
      .otp {
        display: inline-block;
        background-color: #4CAF50;
        color: #ffffff;
        font-size: 24px;
        font-weight: bold;
        padding: 12px 24px;
        border-radius: 6px;
        margin: 20px 0;
        letter-spacing: 4px;
      }
      .footer {
        text-align: center;
        margin-top: 30px;
        font-size: 14px;
        color: #888;
      }
      @media (max-width: 600px) {
        .container {
          margin: 20px;
          padding: 20px;
        }
        .otp {
          font-size: 20px;
          padding: 10px 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header"><h1>Verify Your Email</h1></div>
      <div class="content">
        <p>Hello <strong>${username}</strong>,</p>
        <p>Please use the OTP below to verify your email:</p>
        <div class="otp">${otp}</div>
        <p>This OTP is valid for 10 minutes.</p>
      </div>
      <div class="footer">&copy; 2025 Classyshop</div>
    </div>
  </body>
  </html>
	`;
}
