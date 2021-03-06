import React from 'react'
import CurrencyFormatter from 'currency-formatter'

export default props => {
    const rows = props.lancamentos.map(lancamento => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{CurrencyFormatter.format(lancamento.valor, { locale: 'pt-BR' })}</td>
                <td>{lancamento.tipoLancamento}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.statusLancamento}</td>
                <td>
                    <button className='btn btn-success' title='Efetivar'
                        disabled={lancamento.status != 'PENDENTE'}
                        onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')}
                        type='button'>
                        <i className="pi pi-check"></i>
                    </button>
                    <button className='btn btn-warning' title='Cancelar'
                        disabled={lancamento.status != 'PENDENTE'}
                        onClick={e => props.alterarStatus(lancamento, 'CANCELADO')}
                        type='button'>
                        <i className="pi pi-times"></i>
                    </button>
                    <button onClick={e => props.editarAction(lancamento.id)}
                        type="button" className="btn btn-primary" title='Editar'>
                            <i className="pi pi-pencil"></i>
                        </button>

                    <button onClick={e => props.deleteAction(lancamento)}
                        type="button" className="btn btn-danger" title='Excluir'>
                            <i className="pi pi-trash"></i>
                        </button>
                </td>
            </tr>
        )
    })

    return (
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}