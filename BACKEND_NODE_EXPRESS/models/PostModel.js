class PostModel {

    static lista = [
        {
            id: 1,
            titulo:"admin",
            conteudo:""
        },

        {
            id: 2,
            nome:"teste1",
            login:""
        }
    ];


    static listar(){
        return PostModel.lista;
    }

    static consultarPorId(id){
        const dados = PostModel.lista.filter(item => item.id == id);
        return dados;
    }

    static criar(data){
        PostModel.lista.push(data)

    }

    static atualizar(id, data){

        const indice = PostModel.lista.findIndex(item => item.id == id);
        UsuarioModel.lista[indice] = data;


    }

    static deletar(id){
        const dados = PostModel.lista.filter(item => item.id != id);
        UsuarioModel.lista - dados;
    }
}

module.exports = PostModel;