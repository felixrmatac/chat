/* 
	AUTOR: ANDRES VALENZUELA
	FECHA: 16/08/2015
	MAIL: afvs1989@gmail.com
	OBRA:  CHAT FRONT-END 
	VERSION: 1.0
	DESCRIPCION: ESTE CHAT TRABAJA CON ANGULAR,FIREBASE Y LOCAL STORAGE PARA OPTOMIZAR SU USO Y OLVIDARTE DEL BACK-END,TAMBIEN
	PODRAS UTILIZARLO CON API´S QUE RETORNE UN JSON.

*/
//Modulo Angular Js  inyectando dependecias 'ngAnimate','firebase','LocalStorageModule'
angular.module('myApp',['ngAnimate','firebase','LocalStorageModule'])
	.config(function(localStorageServiceProvider){
	  localStorageServiceProvider.setPrefix('demoPrefix');
	})
	.controller('ctrlFire',function($scope,$firebaseArray,localStorageService,$filter){
		//Instanciando Firebase
		var ref = new Firebase("https://chat-afvs.firebaseio.com/");
		//Obteniendo ek array de firebase
		$scope.listaChats = $firebaseArray(ref)
		//Formateando a la fecha
		$scope.factual = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
		//Método para agregar el comentario a firebase
		$scope.agregarComentario = function(){
			//comprobando si la variable token existe
			if (localStorageService.get('token')) {
				var token = localStorageService.get('token');
			}else{
				var token = 0;
			}
			//Envio de parametros a firebase
			$scope.listaChats.$add({
				token : token,
				comentario : $scope.estudiante,
				user : $scope.txtuser,
				fecha : $scope.factual
			})
			$scope.estudiante = ''

		}


		/*        Uso de Local Storage */
			//Creo en local storage una variable usuario
			$scope.txtuser = localStorageService.get('usuario');
			
			//Observo el cambio del cuadro txtuser
		    $scope.$watch('txtuser', function(value){
		      localStorageService.set('usuario',value);
		      $scope.txtuser = localStorageService.get('usuario');

		    });

		    $scope.storageType = 'Local storage';

		    if (localStorageService.getStorageType().indexOf('session') >= 0) {
		      $scope.storageType = 'Session storage';
		    }

		    if (!localStorageService.isSupported) {
		      $scope.storageType = 'Cookie';
		    }

		    
		    //Recogiendo el valor del cuadro txtuser
		    $scope.$watch(function(){
		      return localStorageService.get('usuario');
		    }, function(value){
		      $scope.txtuser = value;
		    });


		    //Metodo que se invoca si existe un cambio
		    $scope.local = function() {
				   var aleatorio = Math.floor((Math.random() * 1000) + 1);
				   return localStorageService.set('token',$scope.txtuser+'-AfvsCHat-'+aleatorio);
				   console.log("funciona");
			}

			//Elimina Local Storage

		    $scope.clearAll = localStorageService.clearAll;





	})