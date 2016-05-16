<?php

$dados_form = file_get_contents("php://input");
$obj = json_decode($dados_form);

$id = $obj->id;
$assunto = $obj->assunto;
$corpoMsg = $obj->corpoMsg;
$dataPublicacao = $obj->dataPublicacao;

include 'connect.php';

$sql = "update noticias set assunto='$assunto',corpoMsg='$corpoMsg',dataPublicacao='$dataPublicacao' where noticiaID=$id";
$result = @mysql_query($sql);
if ($result){
	echo json_encode(array('success'=>true));
} else {
	echo json_encode(array('msg'=>'Erro ao atualizar dados.'));
}
?>