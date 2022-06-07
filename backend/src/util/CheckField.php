<?php

namespace Src\util;

class CheckField
{
    public static function array_Any_key_Not_exists($array, ...$names)
    {
        foreach ($names as $name) {
            if(!array_key_exists($name,$array)){
                var_dump($name);
                return true;
            }
        }
        return false;
    }
}