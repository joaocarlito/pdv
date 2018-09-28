[$(document).ready(function () {

        var valorTotal = 0;
        var produtosCadastrados = [];

        $.getJSON('model/produtos.json', function (valores) {
            produtosCadastrados = valores;
        });

        function pesquisaProduto(pesquisa, cb)
        {
            var lista = produtosCadastrados.filter(function(el){
                if(el.nome.search(pesquisa) >= 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            });
            
            cb(lista);
        }
        

        //autocomplete
        $("#input-produto").typeahead({
            minLength: 3,
            highligth: true
        },
                {
                    name: 'produtos',
                    source: pesquisaProduto,
                    display: 'nome'
                });
                
                
          // evento quando seleciona produto      
         $("#input-produto").bind('typeahead:select', function(ev, valor){
             addProduto(valor);
         }); // fim do select
         
         
         

        //add cod. barras
        $("#btn-codbarras").click(function () {
            var cod = $("#input-codbarras").val();


            var res = produtosCadastrados.find(function (el) {
                return el.id == cod;
            }); // fim do find

            if (res == undefined)
            {
                $('#modal-codBarras').modal('show')
            } else
            {
                addProduto(res);
            }

        }); // fim do Click
        
        function addProduto(produto){
            
            var html = '<li>' + produto.nome + ' ------ ' + formataReais(produto.preco) + '</li>';
                $("#card-produtos ol").append(html); //append adiciona na ultima posição.
                valorTotal += produto.preco;

                $("#input-codbarras").val('');
                $("#input-produto").typeahead('val' , '');
                $("#card-totalpagar .valor").html(formataReais(valorTotal));
        }
        
        $("#btn-cancelar-sim").click(function(){
            window.location.reload();
        }); // fim do click

    })]; // fim document ready

function formataReais(valor)
{
    var formatado = "R$ " + valor.toFixed(2).replace(".", ",");
    return formatado;

}

