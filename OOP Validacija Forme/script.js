let config = {
    'ime_prezime': {
        required: true,
        minlength: 5,
        maxlength: 30
    },
    'korisnicko_ime': {
        'required': true,
        'minlength': 3,
        'maxlength': 30
    },
    'email': {
        'email': true,
        'maxlength': 40,
    },
    'broj_telefona': {
        'required': false,
        'plus': true,
        'numbers': true,
        'maxlength': 30
    },
    'lozinka': {
        'required': true,
        'minlength': 5,
        'maxlength': 30,
        'matching': 'ponovi_lozinku'
    },
    'ponovi_lozinku': {
        'required': true,
        'minlength': 5,
        'maxlength': 30,
        'matching': 'lozinka'
    }
};

let validator = new Validator(config);