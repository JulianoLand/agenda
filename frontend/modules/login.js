import validator from 'validator';


export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        if (!this.form) {
            console.error("Formulário não encontrado!");
            return;
        }
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        // Remove mensagens de erro anteriores
        const erros = document.querySelectorAll('.erro');
        for (let p of erros) {
            p.remove();
        }

        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let error = false;

        // Validação de email
        if (!validator.isEmail(emailInput.value)) {
            let p = document.createElement('p');
            let errorMsg = document.createTextNode('Email inválido.');
            p.appendChild(errorMsg);
            p.classList.add('erro', 'alert-danger');
            emailInput.after(p);
            error = true;
        }

        // Validação de senha
        if (passwordInput.value.length < 3 || passwordInput.value.length > 15) {
            let p = document.createElement('p');
            let errorMsg = document.createTextNode('A senha deve ter entre 3 e 15 caracteres.');
            p.appendChild(errorMsg);
            p.classList.add('erro', 'alert-danger');
            passwordInput.after(p);
            error = true;
        }

        // Se não houver erro, submete o formulário
        if (!error) el.submit();
    }
}
