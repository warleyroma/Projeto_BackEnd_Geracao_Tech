
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


    static listar(){
        return UsuarioModel.lista;
    }

    static consultarPorId(id){
        const dados = UsuarioModel.lista.filter(item => item.id == id);
        return dados;
    }

    static criar(data){
        UsuarioModel.lista.push(data)

    }

    static atualizar(id, data){

        const indice = UsuarioModel.lista.findIndex(item => item.id == id);
        UsuarioModel.lista[indice] = data;


    }

    static deletar(id){
        const dados = UsuarioModel.lista.filter(item => item.id != id);
        UsuarioModel.lista - dados;
    }

}

module.exports = UsuarioModel;