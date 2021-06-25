<?php

class SW_Controller {
    static public function get_person_list($id = null, $page = 1) {
        return SW_Model::get_person($id, $page);
    }
    
    static protected function get_api_subdata($endpoints, $key) {
        $data = [];

        if ( ! is_array($endpoints) ) {
            $endpoints = [$endpoints];    
        }

        foreach ($endpoints as $endpoint) {
            $data[] = json_decode(SW_Model::make_request($endpoint), true)[$key];
        }

        return $data;
    }

    static public function get_person_details($id, $page) {
        $person = SW_Model::get_person($id, $page);

        $person['homeworld'] = self::get_api_subdata($person['homeworld'], 'name');
        $person['species'] = self::get_api_subdata($person['species'], 'name');
        $person['vehicles'] = self::get_api_subdata($person['vehicles'], 'name');
        $person['starships'] = self::get_api_subdata($person['starships'], 'name');
        $person['films'] = self::get_api_subdata($person['films'], 'title');

        return $person;
    }
}