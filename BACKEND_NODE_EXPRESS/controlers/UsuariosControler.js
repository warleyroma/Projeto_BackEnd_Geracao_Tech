const UsuarioModel = require('../models/UsuarioModel')

class UsuariosControler {
    listar(){
        const UsuarioModel = UsuarioModel();
        return UsuarioModel.listar()
    }

    consultarPorId(){
        const UsuarioModel = UsuarioModel();
        return UsuarioModel.consultarPorId()
    }

    criar(){

        const UsuarioModel = UsuarioModel();
        return UsuarioModel.criar()
    }

    atualizar(){
        const UsuarioModel = UsuarioModel();
        return UsuarioModel.atualizar()
    }

    deletar(){
        const UsuarioModel = UsuarioModel();
        return UsuarioModel.deletar()
    }
}

module.exports = UsuariosControler;