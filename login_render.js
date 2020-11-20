$(document).on('click', "#sumbitNew", async(event) => {
    event.preventDefault();
    console.log('create new user');
    let email = $("#newEmail").val();
    console.log(email);
    let pass = $("#newPass").val();
    console.log(pass);

    const result = await axios( {
        method: 'post',
        url: 'https://meal-a-day.herokuapp.com/createUser', //LOCAL
        data: {
            username: `${email}`,
            password: `${pass}`
        },
        withCredentials: true

    }).catch(() => {
        console.log('hey')
    });
    console.log(result)

})