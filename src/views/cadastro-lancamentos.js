import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../components/Card'
import FormGroup from '../components/form-group'
import SelectMenu from '../components/selectMenu'
import LancamentoService from '../app/services/lancamentoService'
import { msgErro, msgSuccess } from '../components/toastr'
import LocalStorageService from '../app/services/localstorageService'
class CadastroLancamentos extends React.Component {
    constructor() {
        super()
        this.service = new LancamentoService()
    }
    state = {
        id: null,
        descricao: '',
        ano: '',
        mes: '',
        valor: '',
        tipo: '',
        usuario:null,
        status: '',
        atualizando: false
    }
    componentDidMount() {
        const params = this.props.match.params
        if(params.id){
            this.service.obterPorId(params.id)
            .then(response => {
                this.setState({...response.data, atualizando:true})
            }).catch(erro => {
            msgErro(erro.response.data)})
        }        
     }

    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        this.setState({ [name]: value })
    }
   
    submit = () => {
  
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        const {descricao, valor, mes, ano, tipo } = this.state

        const lancamento = {
            descricao,
            valor,
            mes,
            ano,
            tipo,
            usuario: usuarioLogado.id 
            
        }

        try{
            this.service.validar(lancamento)
        }
        catch(erro){
            const mensagens = erro.mensagens
            mensagens.forEach(msg => msgErro(msg))
            return false     
           
        }

        this.service.salvar(lancamento)
        .then(response => {
            this.props.history.push('/consulta-lancamentos')
            msgSuccess('Lancamento criado com sucesso')
        }).catch(erros => {
            msgErro(erros.response.data)
        })
    }
    atualizar = () => {
        const {descricao, valor, mes, ano, tipo, status, usuario, id } = this.state

        const obj = { descricao,mes,ano,usuario,valor,tipo,status,id} 

        this.service.atualizar(obj)
        .then(response => {
            this.props.history.push('/consulta-lancamentos')
            msgSuccess('Lancamento criado com sucesso')
        }).catch(erros => {
            msgErro(erros.response.data)
        })
    }

    render() {

        const tipo = this.service.obterListaTipos()
        const meses = this.service.obterListaMeses()

        return (
            <Card title={this.state.atualizando ? 'Atualização de Lancamento' : 'Cadastro de Lançamento'}>
                <div className='row'>
                    <div className='col-md-12'>
                        <FormGroup id='inputDescricao' label='Descrição. *' >
                            <input id='inputDescricao' type='text' className='form-control' name='descricao'
                                onChange={this.handleChange}
                                value={this.state.descricao} />
                        </FormGroup>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <FormGroup id='inputAno' label='Ano. *' >
                            <input id='inputAno'
                                type='text'
                                className='form-control'
                                value={this.state.ano}
                                onChange={this.handleChange}
                                name='ano' />
                        </FormGroup>
                    </div>
                    <div className='col-md-6'>
                        <FormGroup id='inputMes' label='Mes. *' >
                            < SelectMenu id='inputStatus'
                                lista={meses}
                                className='form-control'
                                value={this.state.mes}
                                onChange={this.handleChange}
                                name='mes' />
                        </FormGroup>
                    </div>
                    <div className='col-md-4'>
                        <FormGroup id='inputValor' label='Valor. *' >
                            <input id='inputValor'
                                type='text'
                                className='form-control'
                                value={this.state.valor}
                                onChange={this.handleChange}
                                name='valor' />
                        </FormGroup>
                    </div>
                    <div className='col-md-4'>
                        <FormGroup id='inputTipo' label='Tipo. *' >
                            < SelectMenu id='inputTipo'
                                lista={tipo}
                                className='form-control'
                                value={this.state.tipo}
                                onChange={this.handleChange}
                                name='tipo' />
                        </FormGroup>
                    </div>
                    <div className='col-md-4'>
                        <FormGroup id='inputStatus' label='Status. *' >
                            <input type='text'
                                className='form-control'
                                disabled
                                name-={'status'}
                                value={this.state.status} />
                        </FormGroup>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-5'>
                        {this.state.atualizando ? (
                             <button className='btn btn-primary' onClick={this.atualizar}>Atualizar</button>
                             ) : (<button className='btn btn-success' onClick={this.submit}>Salvar</button>)

                        }             
                        <button onClick={e => this.props.history.push('/consulta-lancamentos')} className='btn btn-danger'>Cancelar</button>
                    </div>
                </div>


            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos)