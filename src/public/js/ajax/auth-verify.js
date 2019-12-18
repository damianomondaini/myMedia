function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    /*$.ajax({
        url: "/auth/verify",
        data: {
            token: id_token
        },
        type: "post",
        dataType: "json",
        error: function (err) {
            alert('Error while logging in')
            console.log(err);
            throw err;
        },
        success: function (googleId) {
            profilLink(googleId);
        }
    });*/
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        window.location.href = "/";
    });
}

function profilLink(googleId) {
    $('#profil-list-item > a').attr('href', '/profil/' + googleId);
    $('#profil-list-item').show();
}