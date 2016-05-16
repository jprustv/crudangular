var noticias = [];
var currentID = 0;

function isDate(txtdate){
    var currval = txtdate;
    if(currval == ' ')
        return false;

    var rxDatePattern = /(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currval.match(rxDatePattern);

    if (dtArray == null)
        return false;

    dtDay = dtArray[1];
    dtMonth = dtArray[2];
    dtYear = dtArray[3];

    if (dtMonth < 1 || dtMonth >12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth ==6 || dtMonth == 9 || dtMonth == 11) && dtDay ==31)
        return false;
    else if (dtMonth == 2){
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear %  400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}

function noticia(id, assunto, mensagem, data){
    this.id = id;
	this.assunto = assunto;
	this.mensagem = mensagem;
	this.data = data;
}

function deletar(id){
	removerNoticia(id);
	$("#u"+id).remove();
}

function carregarTabela(){
    $.ajax({

        url: "pegar_noticias.php",
        dataType: "json",
    }).done(function(data){
        $("#tabela tr").remove();
        for (var i=0; i<data.rows.length; i++){
            $("#tabela > tbody").append("<tr id = 'u"+(data.rows[i].noticiaID)+"'><td>"+data.rows[i].assunto+"</td> <td>"+data.rows[i].corpoMsg+"</td> <td>"+data.rows[i].dataPublicacao+"</td> <td><a onclick='deletar("+(data.rows[i].noticiaID)+")'><span class='glyphicon glyphicon-trash'></span></a></td> </tr>");

        }
        currentID = data.rows.length;
        if (currentID === undefined) currentID = 0;
    });

}

function adicionarNoticia(i, a, m, d){
    console.log("-- adicionarNoticia");
    console.log(i, a, m, d);
    $.ajax({
        method: "POST",
        url: "salvar_noticias.php",
        data: {id:i, assunto:a, corpoMsg:m, dataPublicacao:d}
    }). done(function(msg){
        console.log(msg);
    })
    carregarTabela();
}

function removerNoticia(i){
    $.ajax({
        method: "POST",
        url: "remover_noticias.php",
        data: {id:i}
    }). done(function(msg){
        console.log(msg);
    })
    carregarTabela();
}

$(document).ready(function(){

    carregarTabela();

  $("#addnoticia").click(function(){

    var assunto = document.getElementById("txtassunto").value;
	var mensagem = document.getElementById("txtmensagem").value;
	var data = document.getElementById("txtdata").value;

    var erro = 0;

    if (assunto.trim()==""){
	    $("#spassunto").show();
		erro++;
	}
	else{
	    $("#spassunto").hide();
	}
	if (mensagem.trim()==""){
		$("#spmensagem").show();
		erro++;
	}
	else{
	    $("#spmensagem").hide();
	}
    if (!isDate(data)){
	    $("#spdata").show();
	    erro++;
	}
	else{
	    $("#spdata").hide();
	}
    if (erro==0){
      //  noticias.push(new noticia(currentID, assunto, mensagem, data));
        adicionarNoticia(currentID, assunto, mensagem, data);
	    return false
	}
  });
  
});