<?php

class SW_Model {
    static public function make_request($endpoint, $as_json = false) {
        $curl = curl_init($endpoint);

        curl_setopt_array($curl, [
            CURLOPT_RETURNTRANSFER => true,
        ]);

        $response = curl_exec($curl);
        $request_errors = curl_error($curl);
        
        curl_close($curl);

        if ( $request_errors !== '' ) {
            return $request_errors;
        }

        return ($as_json) ? json_decode($response, true) : $response;
    }

    static public function get_person($id, $page) {
        $url = 'https://swapi.dev/api/people/';
        
        if ( $id !== null ) {
            $url .= $id;
        }

        if ( $page !== null ) {
            $url = $url . '?page=' . $page;
        }

        return self::make_request($url, true);
    }
}
