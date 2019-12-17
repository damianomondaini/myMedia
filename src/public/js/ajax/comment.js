$('#submit-button').on('click', function () {
    var auth2 = gapi.auth2.init();
    if(auth2.isSignedIn.get()) {
        var googleId = auth2.currentUser.get().getBasicProfile().getId();
        var comment = $('#comment_area').val();
        var id = $('#comment_area').attr('data-id');
    
        if (googleId === undefined || comment == "" || id == "") {
            alert("Le formulaire n'est pas rempli correctement ou connectez-vous");
        } else {
            $.ajax({
                type: 'POST',
                url: '/commentaire/ajouter',
                data: {
                    googleId: googleId,
                    comment: comment,
                    id: id
                },
                dataType: "json",
                success: function (comment) {
                    location.reload();
                },
                error: function (err) {
                    throw err;
                }
            });
        }
    } else {
        alert('Veuillez vous connecter pour ajouter un commentaire');
    }
});