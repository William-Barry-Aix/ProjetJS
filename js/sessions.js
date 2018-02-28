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
            if (data['valide']) {
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

    function déconnexion() {
        location.reload();
    }

    function test_connexion(data) {
        if (exists(data['oui'])) {
            if (data['oui']) {
                $('#connexion').css({
                    'display': 'none'
                });
                $('#déconnexion').css({
                    'display': 'unset'
                });
                new Damier(3, 3, 3, '#damier');
            }
            else {
                $('#connexion').css({
                    'display': 'unset'
                });
                $('#déconnexion').css({
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

        $('#déconnexion').submit(() => {
            $.ajax({
                'url': 'php/sessions/déconnexion.php',
                'method': 'POST',
                'data': $('#connexion').serialize()
            })
                .done(déconnexion)
                .fail(erreur);
            return false;
        });

        $.ajax({
            'url': 'php/sessions/est_connecte.php',
        })
            .done((data) => {test_connexion(data);})
            .fail(erreur);

    });
})();
