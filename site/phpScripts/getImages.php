<?php
    if (isset($_GET["fileName"])) {
        $file_name = $_GET["fileName"];
        $path = "../../images/" . $file_name;

        if (file_exists($path)) {
            $image_data = file_get_contents($path);
            // TODO content type not always jpeg... mime_content_type()
            header("Content-Type: image/jpeg");
            echo $image_data;
            exit();
        } else {
            http_response_code(404);
        }
    } else {
        http_response_code(403);
    }