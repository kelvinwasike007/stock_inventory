$(document).ready(function () {
    
        $("#sidebar").mCustomScrollbar({
             theme: "minimal"
    });  
    $('#sidebarActivate').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

$(document).ready(function() {
    $('#dataTable').DataTable();
} );
