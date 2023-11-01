import ConvertMJMLToHTML from "../utils/convertMJMLtoHtml.js";

const VerifyEmail = (otp, rest = {}) => {
    const mjml = `
    <mjml>
        <mj-head>
            <mj-breakpoint width="320px" />
            <mj-attributes>
            </mj-attributes>
            <mj-style inline="inline">
            </mj-style>
            <mj-style>
            </mj-style>
        </mj-head>
        <mj-body css-class="mainBody">
            <mj-section full-width="full-width">
                <mj-column width="100%">
                    <mj-image height="185px" src="https://easyemoney-email-template-images.s3.eu-west-2.amazonaws.com/rectangle.jpeg" />
                </mj-column>
            </mj-section>
            <mj-section css-class="bgimg" padding="0px 0px 50px 20px">
                <mj-column width="100%">
                    <mj-text font-family="helvetica" css-class="welcome">
                        <h1 style="font-weight:bold;margin:0;font-size:60px;color:gray;text-shadow:-2px -1px black">WELCOME</h1>
                        <p style="margin-top:8px;font-size:20px">Thank you for choosing to open an account with us!</p>
                        <p style="padding-top:30px;font-size:18px">Dear valued customer</p>

                        <p style="font-size:18px;padding:20px 0px 0px 0px">You are one step closer to enjoying our amazing features and managing your finances from anywhere at any time.
Please, use the below code to verify your email address and continue with the application process:</p>

                        <p style="padding-top:20px;font-size:18px">OTP:{{otp}}</p>

                        <p style="padding-top:10px;font-size:18px">Thank you,</p>
                      
                      <p style="padding-top:40px;font-size:18px">Onboarding Team</p>
                        <p style="font-size:18px">Easy E-Money</p>
                    </mj-text>
                </mj-column>
            </mj-section>
            <mj-section padding="30px 0px 0px 30px">
                <mj-column width="100%">
                    <mj-image align="left" padding="10px" height="100px" width="100px" src="https://easyemoney-email-template-images.s3.eu-west-2.amazonaws.com/logo.jpg" />
                </mj-column>
            </mj-section>
            <mj-section padding="50px 0px 0px 20px">
                <mj-column background-color="#DDDCE1">
                    <mj-text font-family="helvetica">
                        <p style="font-size:11px">Easy E-Money is a trading style of Easy Cash Card Limited (Company number : 10623187) and regulated by FCA (FRN:032703) the account is provided by modulr FS Limited, regulated by the Financial Conduct Authority for issuance of electronic money (FRN:900573)</p>
                    </mj-text>
                </mj-column>
            </mj-section>
        </mj-body>
    </mjml>
    `;
    const templateData = { otp, ...rest };
    const html = ConvertMJMLToHTML(mjml, templateData);
    return html;
};

export default VerifyEmail;
