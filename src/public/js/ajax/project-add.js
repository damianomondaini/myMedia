$('#submit-button').on('click', function () {
    var auth2 = gapi.auth2.init();
    if(auth2.isSignedIn.get()) {
        var googleId = auth2.currentUser.get().getBasicProfile().getId();
        var title = $('#title-input').val()
        var mediaType = $('.form-inner__radio').find('input:checked').attr('id');
        var description = $('#description-textarea').val();
        var category = $('#category-select').find('option:selected').val();
        var media;
        if (mediaType != 'media-none') {
            media = $('#media-file')[0].files[0];
        }
    
        if (title === '' || mediaType === undefined || description === '' || category === undefined || googleId === undefined || mediaType != 'media-none' && media === undefined) {
            alert("Le formulaire n'est pas rempli correctement ou connectez-vous");
        } else {
            $('#submit-button').off();
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
                url: '/projet/ajouter',
                data: form,
                processData: false,
                contentType: false,
                success: function (projectId) {
                    window.location.href = "/projet/details/" + projectId;
                },
                error: function (err) {
                    location.reload();
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