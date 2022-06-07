<?php

function logFile($msg)
{
  file_put_contents("./log.txt", $msg . "\n", FILE_APPEND);
}
