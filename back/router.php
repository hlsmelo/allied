<?php

class SW_Router {
    protected $routes = null;
 
    public function __construct(array $routes) {
        $this->routes = $routes;

        $route = array_filter( $this->routes, [$this, 'route_filter'] );
        $keys = array_keys($route);

        $callable = $route[ $keys[0] ]['action'];

        if ( count($route) === 0 ) {
            echo 'Page not found!';
            
            return; 
        }

        echo ( is_callable($callable) ) ? $callable() : $callable;
    }

    public function route_filter($item) {
       return $_GET['view'] === $item['route'];
    }
}

$router = new SW_Router(
    [
        ['route' => 'list', 'action' => SW_Viewer::class . '::show_list_page'],
        ['route' => 'details', 'action' => SW_Viewer::class . '::show_details_page'],
    ]
);