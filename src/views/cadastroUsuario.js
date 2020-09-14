import React from 'react'

import Card from '../components/Card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'
import UsuarioService from '../app/services/usuarioSerivce'
import { msgSuccess, msgErro } from '../components/toastr'
class CadastroUsuario extends React.Component {
    state = {
        email: null,
        nome: null,    
        password: null,
        senhaRepeticao: null
    }
    constructor() {
        super()
        this.service = new UsuarioService()
    }

    validar() {
        const problemas = []
        
        if(!this.state.nome){
            problemas.push('O campo nome é obrigatorio.')
        }
        if(!this.state.email){
            problemas.push('O campo Email é obrigatorio.')
        }else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            problemas.push('Informe um email valido')
        }

        if(!this.state.password || !this.state.senhaRepeticao){
            problemas.push('Digite a senha 2x')
            
        }else if(this.state.password !== this.state.senhaRepeticao){
         
            problemas.push('AS senhas são diferentes')
        }
        return problemas
   }
    
    cadastrar = () => {
         const err = this.validar()
         if(err && err.length > 0) {
            err.forEach((msg, index) => {
                 msgErro(msg)
             })
             return false
         }   

        const usuario = {        
            nome: this.state.nome,
            email: this.state.email,
            password: this.state.password,
        }
        this.service.salvar(usuario)       
            .then(responde => {
                console.log(usuario.response)
                msgSuccess('Usuario cadastrado com sucesso')
                this.props.history.push('/login')
            }).catch(err => {
                msgErro(err.response.data)
            })
    }
    retornarLogin = () => {
        this.props.history.push('/login')
    }


    render() {
        return (

            <Card title='Cadastro de Usuário'>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome. *" htmlFor='inputNome'>
                                <input type='text' id='inputNome' className='form-control' name='Nome' onChange={e => this.setState({ nome: e.target.value })} />
                            </FormGroup>
                            <FormGroup label='Email. *' htmlFor='inputEmail'>
                                <input type='text' id='inputEmail' className='form-control' name='Email' onChange={e => this.setState({ email: e.target.value })} />
                            </FormGroup>
                            <FormGroup label='Senha. *' htmlFor='inputSenha'>
                                <input type='password' id='inputSenha' className='form-control' name='Senha' onChange={e => this.setState({ password: e.target.value })} />
                            </FormGroup>
                            <FormGroup label='Confirmar senha. *' htmlFor='inputConfirmSenha'>
                                <input type='password' id='inputConfirmSenha' className='form-control' name='ConfirmSenha' onChange={e => this.setState({ senhaRepeticao: e.target.value })} />
                            </FormGroup>
                            <button onClick={this.cadastrar} type='button' className='btn btn-success'>Salvar</button>

                            <button onClick={this.retornarLogin} type='button' className='btn btn-danger'>Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>


        )
    }
}
export default withRouter(CadastroUsuario)