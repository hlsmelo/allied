const PersonList = function() {
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
                    '<div class="list">',
                        '<div class="search">',
                            '<input type="text" /><input type="button" value="Pesquisar" />',
                        '</div>',
                        '<table class="list">',
                            '<thead></thead>',
                            '<tbody></tbody>',
                        '</table>',
                       '<div class="nav"><a href="#">Prev</a><a href="#">Next</a></div>',
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
        main.listWrapper = main.children[1];
        main.searchWrapper = main.listWrapper.children[0];
        main.search = main.searchWrapper.children[0];
        main.searchButton = main.searchWrapper.children[1];
        main.list = main.listWrapper.children[1];
        main.listTitle = main.list.children[0];
        main.listBody = main.list.children[1];
        main.navWrapper = main.listWrapper.children[2];
        main.navPrev = main.navWrapper.children[0];
        main.navNext = main.navWrapper.children[1];

        // _main = main;
        
        _obj.main = main;
    }

    _obj.setTitleNavLinks = function() {
        _obj.main._title.innerHTML = 'Personagens';

        if ( _obj.data.previous !== null ) {
            _obj.main.navPrev.href = '?view=list&page=' + _obj.data.previous.split('=')[1];
        }

        if ( _obj.data.next !== null ) {
            _obj.main.navNext.href = '?view=list&page=' + _obj.data.next.split('=')[1];
        }
    }

    _obj.getNewLine = function(data) {
        const tr = document.createElement('tr');

        tr.innerHTML = [
            '<td>{{name}}</td>'.replace('{{name}}', data.name),
            '<td><a href="{{url}}">Ver detalhes</a></td>'.replace(
                '{{url}}',
                '?view=details&id=' + data.url.split('people/')[1].replace('/', '')
            ),
        ].join('');

        return tr;
    }

    _obj.fillList = function() {
        const list = _obj.data.results;

        list.forEach(function(item) {
            _obj.main.listBody.appendChild( _obj.getNewLine( item ) );
        });
    }

    _obj.showSearchResults = function(results) {
        console.log(results.results);
    }

    _obj.setSearchHanler = function() {
        const base = 'https://swapi.dev/api/people/?search=';

        _obj.main.search.addEventListener('keypress', function(key) {
            if (key.keyCode !== 13) {
                return;
            }

            _obj.main.searchButton.click();
        });

        _obj.main.searchButton.addEventListener('click', function() {
            const url = base + _obj.main.search.value;

            fetch(url)
                .then( function(response) { return response.json(); } )
                .then( function(json) { return _obj.showSearchResults(json); } );
        }); 
    }

    const init = function() {
        _obj.data = document.body.SWData.list;

        _obj.writeBase();
        _obj.fillList();
        _obj.setTitleNavLinks();
        _obj.setSearchHanler();
    }

    init();
}

const personList = new PersonList();