const newsLetterForm = $('#newsletter-form');
const emailInput = $('[name=email]')

const JsonBinApiKey = '$2b$10$vfYNdLzedKp84eJImM8paOVyxwzO/aMwKfVDO/hpWvmF3Y3UqGgJ6';
const JsonBinAcessKey = '$2b$10$qN.Bs5yQc2JKLkay1rpGyuta/fAH4TQ1VYzVEiAsTcPJcf0RjCk42';
const jsonbinBinUrl = 'https://api.jsonbin.io/v3/b/63259bcc5c146d63ca9ecbc4';

newsLetterForm.on('submit',async (e)=>{
    e.preventDefault()
    const email = emailInput.val()

    const newsLetterEmails = await getEmails()
    console.log(newsLetterEmails);
    if (newsLetterEmails.newsletterEmails.includes(email)){
        alert('email already subscribed to newsletter')
    }
    else{
        newsLetterEmails.newsletterEmails.push(email)

        $.ajax({
            type: "PUT",
            url: jsonbinBinUrl,
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JsonBinApiKey,

            },
            data: JSON.stringify(newsLetterEmails),
            success: function (data) {
                alert("Successfully subscribed to news letter")
                console.log(data.record);
            },
            error: function (error) {
                console.log ("ERROR:" + error.message);
            }
        });

    }
    

})



const getEmails = async ()=>{
    let emailData = null;
    await $.ajax({
        type: "GET",
        url: jsonbinBinUrl,
        headers: {
            'X-Master-Key': JsonBinApiKey,
            'X-Access-Key': JsonBinAcessKey,
            'X-Bin-Meta': false
        },
        success: function (data) {
            emailData = data
        },
        error: function (error) {
            // console.log ("ERROR:" + error);
        }
    });
    return emailData
}