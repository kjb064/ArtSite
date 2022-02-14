<?php
require('ResourceUtil.php');

    $directoryName = $_GET[ResourceUtil::DIRECTORY_PARAM];
    if (isset($directoryName)) {
        ResourceUtil::getAllFiles($directoryName, "/\.(jpeg|jpg|png)$/i");
    } else {
        http_response_code(403);
    }