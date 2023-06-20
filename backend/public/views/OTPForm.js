const OTPForm = (OTP) => {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600&family=Mali:wght@300;400;600;700&family=Rubik:wght@300;400;500;600;700&display=swap');
            *{
                padding: 0;
                margin: 0;
                font-family: 'Rubik', sans-serif;
                color: white;
            }
            
        </style>
    
    </head>
    
    <body>
        <!-- partial:index.partial.html -->
        <div style="background-color: #121212;overflow:auto;line-height:2; display: flex; ">
            <div style="margin:50px auto;padding:20px; background-color: #292929;border-radius: 8px;">
                <div style="border-bottom:1px solid #eee">
                    <a href="" style="color: white;font-size:2em;text-decoration:none;font-weight:600">KMITinity</a>
                </div>
                <p>Use the following OTP to complete your Password Recovery Procedure.</p>
                <h2
                    style="background: #454545;margin: 10px auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">
                    ${OTP}</h2>
                <p style="font-size:0.9em;">Regards,<br />KMITinity Team</p>
                <hr style="border:none;border-top:1px solid #eee" />
            </div>
        </div>
        <!-- partial -->
    
    </body>
    
    </html>`
}
export default OTPForm