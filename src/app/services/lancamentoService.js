import ApiService from '../apiservice'

export default class LancamentoService extends ApiService {
    constructor(){
        super('/api/lancamentos')
    }
    obterListaMeses(){
        return  [
            { label: 'Selecione..', valor: '' },
            { label: 'Janeiro', valor: 1 },
            { label: 'Fevereiro', valor: 2 },
            { label: 'Março', valor: 3 },
            { label: 'Maio', valor: 4 },
            { label: 'Junho', valor: 5 },
            { label: 'Julho', valor: 6 },
            { label: 'Agosto', valor: 7 },
            { label: 'Setembro', valor: 8 },
            { label: 'Outubro', valor: 9 },
            { label: 'Novembro', valor: 10 },
            { label: 'Dezembro', valor: 12 }
        ]
    
    }
    obterListaTipos() {
        return [
            { label: 'Selecione...', valor: '' },
            { label: 'Despesa', valor: 'DESPESA' },
            { label: 'Receita', valor: 'RECEITA' },
        ]
    }
    consultar(lancamentoFiltro){
        let params = `?ano=${lancamentoFiltro.ano}`

        if(lancamentoFiltro.mes){
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
}