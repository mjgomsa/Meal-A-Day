$(function () {
    $(document).on('click', '#submitRtrnAccount', async function(event) {
        event.preventDefault();
        let username = $("#rtrnUsername").val();
        let password = $("#rtrnPass").val();
        const result = await axios( {
            method: 'post',
            url: 'http://localhost:3000/login', //LOCAL
            data: {
                user: `${username}`,
                password: `${password}`
            },
            withCredentials: true
        }).catch(() => {
            $("#messages").append('<br><p class="has-text-danger">Username or password incorrect. Try again!<p>')
        }).then(() => {
            $("#messages").append('<br><p class="has-text-danger">SUCCESS!<p>');
        })
        // if(result.data == true){
            
            // location.href = "./profile_mockpage.html"
            //$("#name").append('<p>LOGGED IN USER</p>')
            //   getUserInfo();
        
    })  

    $(document).on('click', '#submitNewAccount', async function(event) {
        event.preventDefault();
        let username = $("#username").val();
        let name = $("#name").val();
        let password1 = $("#pass1").val();
        let password2= $("#pass2").val();
        
        if (password1 != password2) {
            alert("Passwords do not match, try again!");
            return;
        } else {
            const result = await axios({
                method: 'post',
                url: 'http://localhost:3000/createUser', //LOCAL
                data: {
                    username: `${username}`,
                    name:`${name}`,
                    password: `${password1}`
                },
                withCredentials: true
            });
            console.log(results.data);
        }
    })
});