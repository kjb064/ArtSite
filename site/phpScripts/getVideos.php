<?php
    if (isset($_GET["directory"])) {
        $directory = "../art/" . $_GET["directory"];
        // TODO scandir returns {boolean} false on error
        $files = preg_grep("/\.(mp4)$/i", scandir($directory));
        $files = array_values($files);
        echo(json_encode($files));
        exit();
    } else {
        http_response_code(403);
    }