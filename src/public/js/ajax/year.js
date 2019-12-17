$('#submit-button').on('click', function() {
    var auth2 = gapi.auth2.init();
    if(auth2.isSignedIn.get()) {
        var googleId = auth2.currentUser.get().getBasicProfile().getId();
        var year = $('#select-year').val();
    
        if (year == "" || googleId == undefined ) {
            alert("Le formulaire n'est pas rempli correctement ou connectez-vous");
        } else {
            $.ajax({
                type: 'POST',
                url: '/profil/update',
                data: {
                    year: year,
                    googleId: googleId
                },
                dataType: "json",
                success: function (profil) {
                    location.reload();
                },
                error: function (err) {
                    throw err;
                }
            });
        }
    } else {
        alert('Veuillez vous connecter pour modifier le profil');
    }
});