$('#submit-button').on('click', function() {
    var title = $('#title-input').val()
    var mediaType = $('.form-inner__radio').find('input:checked').attr('id');
    var description = $('#description-textarea').val();
    var category = $('#category-select').find('option:selected').val();
    var media;
    if (mediaType != 'media-none') {
        media = $('#media-file')[0].files[0];
    }

    if(title === '' || mediaType === undefined || description === '' || category === undefined || mediaType != 'media-none' && media === undefined) {
        alert("Le formulaire n'est pas rempli correctement");
    } else {
        var form = new FormData()
        form.append('title', title);
        form.append('mediaType', mediaType);
        form.append('description', description);
        form.append('category', category);
        if (media != undefined) {
            form.append('media', media);
        }
        $.ajax({
            type: 'POST',
            url: '/projet/ajouter',
            data: form,
            processData: false,
            contentType: false,
            success: function(res) {
                console.log(res);
            },
            error: function(err) {
                throw err;
            }
        });
    }
});