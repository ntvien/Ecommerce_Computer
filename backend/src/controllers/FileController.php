<?php


namespace Src\controllers;

use Src\core\http\Route\RoutingContextInterface;
use Src\core\http\HttpMessage\HttpResponse;

class FileController
{
  public function uploadFiles(RoutingContextInterface $routingContext)
  {
    $response = new HttpResponse();
    $result = array();
    foreach ($_FILES as $file) {
      $target_dir = "uploads/";
      $target_file = $target_dir . basename(uniqid() . $file["name"]);
      $uploadOk = 1;
      $imageFileType = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));
      // Check if file already exists
      if (file_exists($target_file)) {
        echo "Sorry, file already exists.";
        $uploadOk = 0;
      }

      // Check file size
      if ($file["size"] > 500000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
      }
      // Allow certain file formats
      if (
        $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif" && $imageFileType != "webp"
      ) {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
      }
      // Check if $uploadOk is set to 0 by an error
      if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file
      } else {
        if (move_uploaded_file($file["tmp_name"], $target_file)) {
          $result[] = $target_file;
        } else {
          echo "Sorry, there was an error uploading your file.";
        }
      }
    }
    $response->setBody($result);
    $routingContext->setResponse($response);
  }
  function getImage(RoutingContextInterface $routingContext)
  {
    $fileName = $routingContext->getRequest()->getParams()["fileName"];
    $result = file_get_contents($fileName);
    header('content-type: image/gif');
    echo $result;
  }
}
