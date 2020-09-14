import React from 'react'
import CurrencyFormatter from 'currency-formatter'

export default props => {
    const rows = props.lancamentos.map(lancamento => {
        return (
        <tr key={lancamento.id}>
            <td>{lancamento.descricao}</td>
            <td>{CurrencyFormatter.format(lancamento.valor, {locale: 'pt-BR'})}</td>
            <td>{lancamento.tipoLancamento}</td>
            <td>{lancamento.mes}</td>
            <td>{lancamento.statusLancamento}</td>
            <td>

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