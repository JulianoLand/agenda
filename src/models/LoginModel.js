const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const LoginModel = mongoose.model('Login', LoginSchema); //No lugar de 'blabla' podemos colocar o nome da coleção

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register(){
        this.valida();
        if(this.errors.length > 0) return;

        try {
            this.user = await LoginModel.create(this.body);
        } catch (error) {
            console.log(error);
        }
    }

    valida(){
        this.cleanUp();

        // email precisa ser valido
        if(!validator.isEmail(this.body.email)) this.errors.push('e-mail inválido');
        // A senha precisa ter entre 6 e 15 caracteres
        if(!this.body.password || this.body.password.length < 6 || this.body.password.length > 15) {
            this.errors.push('A senha precisa ter entre 6 e 15 caracteres.');
        }
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email.trim(),
            password: this.body.password.trim()
        };
    }
}

module.exports = Login;