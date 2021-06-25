const PersonDetails = function() {
    if (this === window) {
        throw 'Error';
    }

    const obj = this;
    const _obj = { };

    _obj.writeBase = function() {
        document.write(
            [
                '<div id="main">',
                    '<h1>Teste</h1>',
                    '<div class="details">',
                        '<figure><img src="front/assets/img/no-photo.png"></figure>',
                        '<table class="details">',
                            '<thead></thead>',
                            '<tbody></tbody>',
                        '</table>',
                        '<a onclick="history.back();">Voltar</a>',
                    '</div>',
                '</div>',
            ].join('')
        );

        _obj.setElements();
    }

    _obj.setElements = function() {
        const main = document.querySelector('div#main');

        if (main === null) {
            return;
        }

        main._title = main.children[0];
        main.detailsWrapper = main.children[1];
        main.photo = main.detailsWrapper.children[0];
        main.listInfo = main.detailsWrapper.children[1];
        main.listTitle = main.listInfo.children[0];
        main.listBody = main.listInfo.children[1];
        
        _obj.main = main;
    }

    _obj.setTitle = function() {
        _obj.main._title.innerHTML = _obj.data.name;
    }

    _obj.fillDetails = function() {
        const details = _obj.data;
        const fields = [   
            { value: 'birth_year', label: 'Ano de nascimento' },
            { value: 'height', label: 'Altura' },
            { value: 'gender', label: 'Genero' },
            { value: 'eye_color', label: 'Cor dos olhos' },
            { value: 'skin_color', label: 'Cor da pele' },
            { value: 'hair_color', label: 'Cor do cabelo' },
            { value: 'homeworld', label: 'Planeta natal' },
            { value: 'species', label: 'Espécies' },
            { value: 'vehicles', label: 'Veículos' },
            { value: 'starships', label: 'Naves' },
        ];

        fields.forEach(function(field) {
            const tr = document.createElement('tr');
            let data = '<td><strong>{{label}}</strong></td><td>{{field}}</td>';

            data = data.replace('{{label}}', field.label);
            data = data.replace('{{field}}', details[field.value]);

            tr.innerHTML = data;

            _obj.main.listBody.appendChild( tr );
        });
    }

    const init = function() {
        _obj.data = document.body.SWData.details;

        _obj.writeBase();
        _obj.fillDetails();
        _obj.setTitle();
    }

    init();
}

const personDetails = new PersonDetails();