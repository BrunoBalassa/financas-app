import ApiService from '../apiservice'
import ErroValidacao from '../exception/erroValidacao'

export default class LancamentoService extends ApiService {
    constructor(){
        super('/api/lancamentos')
    }
    obterListaMeses(){
        return  [
            { label: 'Selecione..', value: '' },
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Maio', value: 4 },
            { label: 'Junho', value: 5 },
            { label: 'Julho', value: 6 },
            { label: 'Agosto', value: 7 },
            { label: 'Setembro', value: 8 },
            { label: 'Outubro', value: 9 },
            { label: 'Novembro', value: 10 },
            { label: 'Dezembro', value: 12 }
        ]
    
    }
    obterListaTipos() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' },
        ]
    }
    alterarStatus(id, status){
        return this.put(`/${id}/atualiza-status`, {status})
    }
    consultar(lancamentoFiltro){
        let params = `?ano=${lancamentoFiltro.ano}`

        if(lancamentoFiltro.mes.value){
            params = `${params}&mes=${lancamentoFiltro.mes}`
        }
        if(lancamentoFiltro.tipo){
            params = `${params}&tipo=${lancamentoFiltro.tipo}`
        }
        if(lancamentoFiltro.status){
            params = `${params}&status=${lancamentoFiltro.status}`
        }
        if(lancamentoFiltro.usuario){
            params = `${params}&usuario=${lancamentoFiltro.usuario}`
        }
        if(lancamentoFiltro.descricao){
            params = `${params}&descricao=${lancamentoFiltro.descricao}`
        }    

        return this.get(params)
    }
    deletar(id){
       return this.delete(`/${id}`)
    }
    salvar(lancamento){
        return this.post('/', lancamento)
    }
    obterPorId(id){
        return this.get(`/${id}`)
    }
    atualizar(lancamento){
        return this.put(`/${lancamento.id}`, lancamento)
        
    }

    validar(lancamento) {
        const erros = []

        if(!lancamento.ano){
            erros.push("Informe o Ano.")
        } 

        if(!lancamento.mes){
            erros.push("Informe o Mes.")
        }    

        if(!lancamento.valor){
            erros.push("Informe o Valor.")
        } 

        if(!lancamento.descricao){
            erros.push("Informe o Descricao.")
        } 
        
        if(!lancamento.tipo){
            erros.push("Informe o Tipo.")
        } 

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros)
        }

    }
}