<?php
    if (isset($_GET["directory"])) {
        $directory = "../art/" . $_GET["directory"];
        // TODO scandir returns {boolean} false on error
        $files = preg_grep("/^resume\.pdf$/i", scandir($directory));
        if (!empty($files)) {
            $files = array_values($files);
            echo(json_encode($files));
        } else {
            http_response_code(404);
        }
        exit();
    } else {
        http_response_code(403);
    }