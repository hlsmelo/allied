<?php

class SW_Viewer {
    static protected function add_script($src, $is_style = false) {
        $model = '<script src="%s?ver=%s"></script>';
        
        if ( $is_style ) {
            $model = '<link rel="stylesheet" type="text/css" href="%s?ver=%s" />';
        }

        printf( $model, $src, rand() );
    }
    
    static protected function add_inline_script($inner, $is_style = false) {
        $model = '<script>%s</script>';
        
        if ( $is_style ) {
            $model = '<style>%s</style>';
        }

        printf( $model, $inner );
    }

    static public function show_list_page() {
        $page = isset($_GET['page']) ? $_GET['page'] : 1;

        self::add_inline_script(
            sprintf(
                'document.body.SWData.list=JSON.parse(\'%s\');',
                json_encode( SW_Controller::get_person_list(null, $page) ),
            ),
        );

        self::add_script( 'front/assets/css/list.css', true );
        self::add_script( 'front/assets/js/list.js' );
    }
    
    static public function show_details_page() {
        self::add_inline_script(
            sprintf(
                'document.body.SWData.details=JSON.parse(\'%s\');',
                json_encode( SW_Controller::get_person_details( $_GET['id'], null ) ),
            ),
        );
        
        self::add_script( 'front/assets/css/details.css', true );
        self::add_script( 'front/assets/js/details.js' );
    }
}