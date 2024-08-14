
class UsuarioModel {

    static lista = [
        {
            id: 1,
            nome:"admin",
            login:"admin"
        },

        {
            id: 2,
            nome:"teste",
            login:"teste"
        }
    ];


    static listar(request, response){
        return UsuarioModel.lista;
    }

    static consultarPorId(id){
        const dados = UsuarioModel.lista.filter(item => item.id == id);
        return dados;
    }

    static criar(data){
        UsuarioModel.lista.push(data)

    }

    static atualizar(request, response){

    }

    static deletar(request, response){


    }

}

module.exports = UsuarioModel;