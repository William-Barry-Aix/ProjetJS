(function() {
    'use strict';

    function exists(x) {
        return typeof(x) != undefined;
    }

    function erreur() {
        alert('Erreur !');
    }

    function connexion(data) {
        if (exists(data['valide'])) {
            if (data['valide'] || FB.getUserID()) {
                console.log('Connexion réussie !');
                location.reload();
            }
            else {
                console.log('Connexion échouée, raison : '
                            + (exists(data['raison']) ? data['raison'] : 'inconnue.'));
            }
        }
        else {
            erreur();
        }
    }

    function deconnexion() {
        if (FB.getUserID()){
            FB.logout();
        }
        console.log(FB.getUserID());
        location.reload();
    }

    function test_connexion(data) {
        if (exists(data['oui'])) {
            if (data['oui'] || FB.getUserID()) {
                $('#connexion').css({
                    'display': 'none'
                });
                $('#deconnexion').css({
                    'display': 'unset'
                });
                new Damier(3, 3, 3, '#damier');
            }
            else {
                $('#connexion').css({
                    'display': 'unset'
                });
                $('#deconnexion').css({
                    'display': 'none'
                });
            }
        }
        else {
            erreur();
        }
    }

    $(() => {
        $('#connexion').submit(() => {
            $.ajax({
                'url': 'php/sessions/connexion.php',
                'method': 'POST',
                'data': $('#connexion').serialize()
            })
                .done((data) => {connexion(data);})
                .fail(erreur);
            return false;
        });

        $('#deconnexion').submit(() => {
            $.ajax({
                'url': 'php/sessions/deconnexion.php',
                'method': 'POST',
                'data': $('#connexion').serialize()
            })
                .done(deconnexion)
                .fail(erreur);
            return false;
        });
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '550387488661485',
                cookie     : true,  // enable cookies to allow the server to access
                                    // the session
                xfbml      : true,  // parse social plugins on this page
                version    : 'v2.8', // use graph api version 2.8
                status     : true
            });
            FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
            });
        };

        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        $.ajax({
            'url': 'php/sessions/est_connecte.php',
        })
            .done((data) => {test_connexion(data);})
            .fail(erreur);
        });

})();
function checkLoginState() {
    FB.getLoginStatus(function(response){
        statusChangeCallback(response);
        if (response.status === 'connected'){
            location.reload();
        }
    });
}
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);

}
