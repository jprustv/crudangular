<?php

$dados_form = file_get_contents("php://input");
$obj = json_decode($dados_form);

$id = $obj->id;

include 'connect.php';

$sql = "delete from Noticias where noticiaID=$id";
$result = @mysql_query($sql);
if ($result){
	echo json_encode(array('success'=>true));
} else {
	echo json_encode(array('msg'=>'Erro ao remover dados.'));
}
?>