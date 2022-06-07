<?php
namespace Src\util\jwt;
require "../bootstrap.php";
use \Firebase\JWT\JWT; 
use \Firebase\JWT\ExpiredException;
use Src\core\http\Exception\HttpException;

class JwtHandler {
    protected $jwt_secret;
    protected $token;
    protected $issuedAt;
    protected $expire;
    protected $jwt;
    private static $instances = [];
    private function __construct()
    {
        // set your default time-zone
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $this->issuedAt = time();
        
        // Token Validity (3600 second = 1hr)
        $this->expire = $this->issuedAt + 3600;

        // Set your secret or signature
        $this->jwt_secret = getenv("JWT_SECRET_KEY");  
    }
    private function __clone(){}
    public function __wakeup()
    {
        throw new \Exception("Cannot unserialize a singleton.");
    }
    public static function getInstance()
    {
        $cls = static::class;
        if (!isset(self::$instances[$cls])) {
            self::$instances[$cls] = new static();
        }
        return self::$instances[$cls];
    }
    // ENCODING THE TOKEN
    public function _jwt_encode_data($user_id,$role,$expire){

        $this->token = array(
            //Adding the identifier to the token (who issue the token)
            "user_id" => $user_id,
            "role" => $role,
            // Adding the current timestamp to the token, for identifying that when the token was issued.
            "iat" => $this->issuedAt,
            // Token expiration
            "exp" => $this->issuedAt +$expire,
            // Payload
            "data"=> [
                "user_id" => $user_id,
                "role"=> $role
            ]
        );

        $this->jwt = JWT::encode($this->token, $this->jwt_secret);
        return $this->jwt;

    }
    public function jwt_bearer_decode_data($jwt_token){
        $tokens = explode(" ",$jwt_token);
        if(count($tokens)<2){
            throw new HttpException(404,BAD_TOKEN);
        }
        return $this->_jwt_decode_data($tokens[1]);

}
    //DECODING THE TOKEN
    public function _jwt_decode_data($jwt_token){
        try{

            $decode = JWT::decode($jwt_token, $this->jwt_secret, array('HS256'));
            return get_object_vars($decode->data);
        }
        catch(ExpiredException $e){
            throw new HttpException(404, $e->getMessage());
        }
        catch(\Firebase\JWT\SignatureInvalidException $e){
            throw new HttpException(404, $e->getMessage());
        }
        catch(\Firebase\JWT\BeforeValidException $e){
            throw new HttpException(404, $e->getMessage());
        }
        catch(\DomainException $e){
            throw new HttpException(404, $e->getMessage());
        }
        catch(\InvalidArgumentException $e){
            throw new HttpException(500, $e->getMessage());
        }
        catch(\UnexpectedValueException $e){
            throw new HttpException(500, $e->getMessage());
        }

    }
}