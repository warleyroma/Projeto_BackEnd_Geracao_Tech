const { json } = require("express");
const UsuarioModel = require("../models/UsuarioModel");

class UsuariosControler {
    listar(request, response){
        //const UsuarioModel = UsuarioModel();
        //return UsuarioModel.listar()
        const dados = UsuarioModel.listar()
        return response.json(dados);
    }

    consultarPorId(request, response){
        //const UsuarioModel = UsuarioModel();
        //return UsuarioModel.consultarPorId()
        const id = request.params.id;
        const dados = UsuarioModel.consultarPorId(id)
        return response.json(dados);
    }

    criar(request, response){

       // const UsuarioModel = UsuarioModel();
        //return UsuarioModel.criar()
        const body = request.body;
        UsuarioModel.criar(body);
        return response.status(201).json({
            message:"Usuário cadastrado com sucesso"
        })
    }

    atualizar(request, response){
        //const UsuarioModel = UsuarioModel();
        //return UsuarioModel.atualizar()
        const id = request.params.id;
        const body = request.body;
        UsuarioModel.atualizar(id, body)
        return response.json({
            message:"Usuário atualizado com sucesso"
        }) 
    }

    deletar(request, response){
        //const UsuarioModel = UsuarioModel();
        //return UsuarioModel.deletar()
        const id = request.params.id;
        UsuarioModel.deletar(id);
        return response.json({
            message:"Usuário removido com sucesso"
        })
    }
}

module.exports = UsuariosControler;