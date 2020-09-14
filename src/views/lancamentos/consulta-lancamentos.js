import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/Card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'
import LancamentoService from '../../app/services/lancamentoService'
import LocalStorageService from '../../app/services/localstorageService'
import * as massages from '../../components/toastr'

class ConsultaLancamento extends React.Component {
    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: []
    }
    constructor() {
        super()
        this.service = new LancamentoService()
    }
    buscar = () => {
        if(!this.state.ano){
            massages.msgErro("O campo ano é obrigatorio")
            return false
        }
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }
        this.service
            .consultar(lancamentoFiltro)
            .then(resposta => {
                this.setState({ lancamentos: resposta.data })
            }).catch(err => {
                console.log(err)
            })
    }


    render() {

        const meses = this.service.obterListaMeses()
        const tipos = this.service.obterListaTipos()

        return (
            <Card title='Consulta lançamentos'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='bs-component'>
                            <FormGroup htmlFor='inputAno' label='Ano: *'>
                                <input type="text"
                                    className="form-control"
                                    id="inputAno"
                                    placeholder="Digite o Ano"
                                    value={this.state.ano}
                                    onChange={e => this.setState({ ano: e.target.value })} />
                            </FormGroup>

                            <FormGroup htmlFor='inputMes' label='Mês: *'>
                                <SelectMenu id='inputMes'
                                    value={this.state.mes}
                                    onChange={e => this.setState({ mes: e.target.value })}
                                    className='form-control' lista={meses}>
                                </SelectMenu>
                            </FormGroup>

                            <FormGroup htmlFor='inputDesc' label='Descrição: *'>
                                <input type="text"
                                    className="form-control"
                                    id="inputDesc"
                                    placeholder="Digite a Descrição"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })} />
                            </FormGroup>

                            <FormGroup htmlFor='inputTipo' label='Tipo Lancamento: *'>
                                <SelectMenu
                                    value={this.state.tipo}
                                    onChange={e => this.setState({ tipo: e.target.value })}
                                    className='form-control' lista={tipos}>
                                </SelectMenu>
                            </FormGroup>

                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br />
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='bs-component'>
                            <LancamentosTable lancamentos={this.state.lancamentos} />
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}
export default withRouter(ConsultaLancamento)