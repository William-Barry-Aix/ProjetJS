let Damier;

(function() {
    'use strict';

    Damier = function(x, y, taille_victoire, id) {
        this.largeur = x;
        this.hauteur = y;
        this.taille_victoire = taille_victoire;
        this.tab = [];
        this.tour = 0;
        let self = this;

        let longueur_ligne = function(x, y) {
            if (!self.tab[x][y])
                return 0;

            let longueur = 1;
            for (let i = x + 1; i < self.largeur; i++) {
                if (self.tab[i][y] == self.tab[x][y])
                    longueur++;
                else
                    break;
            }
            for (let i = x - 1; i > 0; i--) {
                if (self.tab[i][y] == self.tab[x][y])
                    longueur++;
                else
                    break;
            }
            console.log(longueur);
        };

        let longueur_colonne = function(x, y) {
            if (!self.tab[x][y])
                return 0;

            let longueur = 1;
            for (let j = x + 1; j < self.largeur; j++) {
                if (self.tab[x][j] == self.tab[x][y])
                    longueur++;
                else
                    break;
            }
            for (let j = x - 1; j > 0; j--) {
                if (self.tab[x][j] == self.tab[x][y])
                    longueur++;
                else
                    break;
            }
        };

        let longueur_diagonale = function(x, y) {
            return 0;
        };

        let vérifier = function(x, y) {
            if (Math.max(longueur_ligne(x, y),
                         longueur_colonne(x, y),
                         longueur_diagonale(x, y))
                > self.taille_victoire)
                return true;
            return false;
        };

        let créer_case = function(x, y) {
            return $('<div />')
                .data('x', x)
                .data('y', y)
                .html('&nbsp;')
                .click(function() {
                    $(this).unbind('click');
                    let x = $(this).data('x');
                    let y = $(this).data('y');

                    if (!self.tab[x][y]) {
                        $(this).html(self.tour % 2 == 0 ? 'X' : 'O');
                        self.tab[x][y] = self.tour % 2 == 0 ? 'X' : 'O';
                        self.tour++;
                    }

                    if (vérifier(x, y)) {
                        $('body').append($('<p />').html('ta gagné lol'));
                    }
                });
        };

        let créer_case_noire = function(x, y) {
            return créer_case(x, y)
                .addClass('case-noire');
        };

        let créer_case_blanche = function(x, y) {
            return créer_case(x, y)
                .addClass('case-blanche');
        };

        let damier = $(id);

        for (let i = 0; i < this.largeur; i++) {
            let row = $('<div />');
            let tabrow = []
            for (let j = 0; j < this.hauteur; j++) {
                row.append((i%2 + j%2 == 1 ? créer_case_noire(j, i) : créer_case_blanche(j, i)));
                tabrow.push(null);
            }
            damier.append(row);
            this.tab.push(tabrow);
        }

    };
})();
