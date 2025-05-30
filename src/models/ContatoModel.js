const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default:'' },
    email: { type: String, required: false, default:'' },
    telefone: { type: String, required: false, default:'' },
    criadoEm: { type: Date, default: Date.now }
})

const ContatoModel = mongoose.model('Contato', ContatoSchema); //No lugar de 'blabla' podemos colocar o nome da coleção

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.prototype.register = async function() {
    this.valida();

    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function() {
    this.cleanUp();

    // email precisa ser valido
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('e-mail inválido');
    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório');
    if(!this.body.email && !this.body.telefone) { 
        this.errors.push('Pelo menos um contato precisa ser enviado: email ou telefone');
    }
}

Contato.prototype.cleanUp = function() {
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        nome: this.body.nome.trim(),
        sobrenome: this.body.sobrenome.trim(),
        email: this.body.email.trim(),
        telefone: this.body.telefone.trim()
    };
}

Contato.prototype.edit = async function(id){
    if(typeof id !== 'string') return;
    this.valida();

    if(this.errors.length > 0) return;

    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
}

// Metodos estáticos
Contato.buscaPorId = async function(id){
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findById(id);
    return contato;
};

Contato.buscaContatos = async function(){
    const contatos = await ContatoModel.find()
        .sort({ criadoEm: -1 });
    return contatos;
};

Contato.delete = async function(id){
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findOneAndDelete({_id: id});
    return contato;
};

module.exports = Contato;