$('#select-category').on('change', function() {
    console.log(this.value);
    if(this.value != 'all') {
        window.location.href = "/projet/category/" + this.value;
    } else {
        window.location.href = "/";
    }
});

$('#select-year').on('change', function() {
    console.log(this.value);
    if(this.value != 'all') {
        window.location.href = "/projet/year/" + this.value;
    } else {
        window.location.href = "/";
    }
});