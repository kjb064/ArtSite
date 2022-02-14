<?php
require('ResourceUtil.php');

    $directory = $_GET[ResourceUtil::DIRECTORY_PARAM];
    if (isset($directory)) {
        ResourceUtil::getFile($directory, "/^resume\.pdf$/i");
    } else {
        http_response_code(403);
    }