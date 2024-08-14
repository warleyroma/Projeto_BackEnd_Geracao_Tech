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
    }

    deletar(request, response){
        //const UsuarioModel = UsuarioModel();
        //return UsuarioModel.deletar()
    }
}

module.exports = UsuariosControler;