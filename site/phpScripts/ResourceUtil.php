<?php
    class ResourceUtil {

        private const ART_DIRECTORY = "art";
        private const ART_DIRECTORY_PATH = "../" . self::ART_DIRECTORY;
        public const DIRECTORY_PARAM = "directory";

        public static function getAllFiles($subDirectory, $pattern) {
            $directory = self::ART_DIRECTORY_PATH . '/' . $subDirectory;
            // TODO scandir returns {boolean} false on error
            $files = preg_grep($pattern, scandir($directory));
            $files = array_values($files);
            $files = array_map(fn($file) => self::ART_DIRECTORY . "/" . $subDirectory . "/" . $file, $files);
            echo(json_encode($files));
        }

        public static function getFile($subDirectory, $pattern) {
            $directory = self::ART_DIRECTORY_PATH . '/' . $subDirectory;
            // TODO scandir returns {boolean} false on error
            $files = preg_grep($pattern, scandir($directory));
            if (!empty($files)) {
                $files = array_values($files);
                $files = array_map(fn($file) => self::ART_DIRECTORY . "/" . $subDirectory . "/" . $file, $files);
                echo(json_encode($files));
            } else {
                http_response_code(404);
            }
        }
    }