<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AlunniController
{
  public function connectDB(){
    return new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
  }

  public function index(Request $request, Response $response, $args){
    ////sleep(0);
    $db = $this->connectDB();
    $result = $db->query("SELECT * FROM alunni");
    if($result){
      $results = $result->fetch_all(MYSQLI_ASSOC);
      $response->getBody()->write(json_encode($results, JSON_NUMERIC_CHECK));
      $code = 200;
    }else{
      $code = 500;
    }
    return $response->withHeader("Content-type", "application/json")->withStatus($code);
  }


  public function delete(Request $request, Response $response, $args){
    //sleep(0);
    $db = $this->connectDB();
    $result = $db->query("DELETE FROM alunni WHERE id = ". $args["id"]);
    if($result){
      $code = 204;
    }else{
      $code = 500;
    }
    return $response->withHeader("Content-type", "application/json")->withStatus($code);
  }

  public function insert(Request $request, Response $response, $args){
    //sleep(0);
    $db = $this->connectDB();
    $data = json_decode($request->getBody()->getContents(), true);
    $nome = $data["nome"];
    $cognome = $data["cognome"];
    $result = $db->query("INSERT INTO alunni (nome, cognome) VALUES('$nome', '$cognome')");
    if($result){
      $code = 201;
    }else{
      $code = 500;
    }
    return $response->withHeader("Content-type", "application/json")->withStatus($code);
  }

  public function update(Request $request, Response $response, $args){
    //sleep(0);
    $db = $this->connectDB();
    $id = $args["id"];
    $data = json_decode($request->getBody()->getContents(), true);
    $nome = $data["nome"];
    $cognome = $data["cognome"];
    $kek = true;
    if($nome != ""){
      $result = $db->query("UPDATE alunni SET nome = '$nome' WHERE id = $id");
      if(!$result){
        $kek = false;
      }
    }
    if($cognome != ""){
      $result = $db->query("UPDATE alunni SET cognome = '$cognome' WHERE id = $id");
      if(!$result){
        $kek = false;
      }
    }
    if($kek){
      $code = 200;
    }else{
      $code = 500;
    }
    return $response->withHeader("Content-type", "application/json")->withStatus($code);
  }
}
