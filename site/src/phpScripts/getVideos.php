<?php
require('ResourceUtil.php');

    $directoryName = $_GET[ResourceUtil::DIRECTORY_PARAM];
    if (isset($directoryName)) {
        ResourceUtil::getAllFiles($directoryName, "/\.(mp4)$/i");
    } else {
        http_response_code(403);
    }

