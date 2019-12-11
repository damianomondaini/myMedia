$('#submit-button').on('click', function () {
    var auth2 = gapi.auth2.init();
    if(auth2.isSignedIn.get()) {
        var googleId = auth2.currentUser.get().getBasicProfile().getId();
        var year = $('#select-year').find('option:selected').val();
        if (title === '' || mediaType === undefined || description === '' || category === undefined || googleId === undefined || mediaType != 'media-none' && media === undefined) {
            alert("Le formulaire n'est pas rempli correctement ou connectez-vous");
        } else {
            var form = new FormData()
            form.append('title', title);
            form.append('mediaType', mediaType);
            form.append('description', description);
            form.append('category', category);
            if (media != undefined) {
                form.append('media', media);
            }
            form.append('googleId', googleId);
            $.ajax({
                type: 'POST',
                url: '/projet/modifier/' + window.location.href.split('/')[5] + '/' + googleId,
                data: form,
                processData: false,
                contentType: false,
                success: function (projectId) {
                    console.log(projectId);
                    window.location.href = "/projet/details/" + projectId;
                },
                error: function (err) {
                    throw err;
                }
            });
        }
    } else {
        alert('Veuillez vous connecter pour ajouter un post');
    }
});
    
$('#media-img').on('click', function() {
    $('#media-file').val('');
    $('#media-file').attr('accept', '.jpg, .jpeg, .png, .gif');
    $('#media-file').show();
});

$('#media-video').on('click', function() {
    $('#media-file').val('');
    $('#media-file').attr('accept', '.mp4');
    $('#media-file').show();
});

$('#media-audio').on('click', function() {
    $('#media-file').val('');
    $('#media-file').attr('accept', '.mp3');
    $('#media-file').show();
});

$('#media-none').on('click', function() {
    $('#media-file').hide();
    $('#media-file').val('');
    $('#media-file').attr('accept', '');
});