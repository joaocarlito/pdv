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
                    source: pesquisaProduto
                });

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
                var html = '<li>' + res.nome + '------ R$ ' + res.preco + '</li>';
                $("#card-produtos ol").append(html); //append adiciona na ultima posição.
                valorTotal += res.preco;

                $("#input-codbarras").val('');
                $("#card-totalpagar .valor").html(formataReais(valorTotal));
            }

        }); // fim do Click

    })]; // fim document ready

function formataReais(valor)
{
    var formatado = "R$ " + valor.toFixed(2).replace(".", ",");
    return formatado;

}

