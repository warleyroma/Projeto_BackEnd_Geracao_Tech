const PostModel = require("../models/PostModel");

class PostsController {
    listar(request, response){
        //const UsuarioModel = UsuarioModel();
        //return UsuarioModel.listar()
        const dados = PostModel.listar()
        return response.json(dados);
    }

    consultarPorId(request, response){
        //const UsuarioModel = UsuarioModel();
        //return UsuarioModel.consultarPorId()
        const id = request.params.id;
        const dados = PostModel.consultarPorId(id)
        return response.json(dados);
    }

    criar(request, response){

       // const UsuarioModel = UsuarioModel();
        //return UsuarioModel.criar()
        const body = request.body;
        PostModel.criar(body);
        return response.status(201).json({
            message:"Post cadastrado com sucesso"
        })
    }

    atualizar(request, response){
        //const UsuarioModel = UsuarioModel();
        //return UsuarioModel.atualizar()
        const id = request.params.id;
        const body = request.body;
        PostModel.atualizar(id, body)
        return response.json({
            message:"Post atualizado com sucesso"
        }) 
    }

    deletar(request, response){
        //const UsuarioModel = UsuarioModel();
        //return UsuarioModel.deletar()
        const id = request.params.id;
        PostModel.deletar(id);
        return response.json({
            message:"Post removido com sucesso"
        })
    }
}

module.exports = PostsController;