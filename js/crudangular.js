
		angular.module("rylsite", []);

        angular.module("rylsite").directive('cadastrarForm', function(){
            return{
                restrict: 'E',
                replace: true,
                templateUrl: 'static/html/formCadastrarNoticia.html'
            };
        });

		angular.module("rylsite").controller("rylsiteController", function ($scope,$http) {

		    $scope.app = "rylsite";
		    $scope.noticias = [];
		    currentID = 0;

		    var carregarLista = function () {

			    $http.get("pegar_noticias.php").success(function(data){
			        $scope.noticias = data;
			        currentID = data.rows.length;
			        if (currentID == undefined) currentID = 0;
			        console.log("-> LISTA ATUALIZADA");

			    }).error(function(data){
			        console.log("Erro: " + data);
			    });

			};

			$scope.adicionarNoticia = function (noticia) {

                $http({
                    method: "POST",
                    url: "salvar_noticias.php",
                    data: {id:currentID, assunto: noticia.assunto, corpoMsg: noticia.corpoMsg, dataPublicacao:noticia.dataPublicacao}
                }).success(function(data){
                    delete $scope.noticia;
                    $scope.formCadastrar.$setPristine();
                    carregarLista();
                    console.log("-> NOTÍCIA ADICIONADA");
                }).error(function(data){
                   console.log("Erro: " + data);
                });
			};

			$scope.apagarNoticia = function (noticia) {
				$http({
                    method: "POST",
                    url: "remover_noticias.php",
                    data: {id:noticia.noticiaID}
                }). success(function(data){
                    carregarLista();
                    console.log("-> NOTÍCIA APAGADA");
                }).error(function(data){
                    console.log("Erro: "+ data);
                });

			};

			$scope.atualizarNoticia = function (noticia) {
			     $http({
                    method: "POST",
                    url: "atualizar_noticias.php",
                    data: {id:noticia.noticiaID, assunto:noticia.assunto, corpoMsg:noticia.corpoMsg, dataPublicacao:noticia.dataPublicacao}
                }).success(function(data){
                    delete $scope.noticia;
                    carregarLista();
                    console.log("-> NOTÍCIA ATUALIZADA");
                }).error(function(data){
                    console.log("Erro: "+ data);
                });

			};

			$scope.editarNoticia = function (noticia) {
				$scope.noticia = noticia;
			};

            carregarLista();

		});

