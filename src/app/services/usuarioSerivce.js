import ApiService from '../apiservice'
import ErroValidacao from '../exception/erroValidacao'

class UsuarioService extends ApiService {
    constructor(){
        super('/api/usuarios')
    }
    autenticar(credenciais) {
        return this.post('/autenticar', credenciais)
    }
    obterSaldoPorUsuario(id) {
        return this.get(`/${id}/saldo`)
    }
    salvar(usuario){
        return this.post('/', usuario)
    }
    validar(usuario){
        const erros = []
        
        if(!usuario.nome){
            erros.push('O campo nome é obrigatorio.')
        }
        if(!usuario.email){
            erros.push('O campo Email é obrigatorio.')
        }else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            erros.push('Informe um email valido')
        }

        if(!usuario.password || !usuario.senhaRepeticao){
            erros.push('Digite a senha 2x')
            
        }else if(usuario.password !== usuario.senhaRepeticao){
         
            erros.push('AS senhas são diferentes')
        }
        if(erros && erros.length> 0) {
            throw new ErroValidacao(erros)
        }
    }
}
export default UsuarioService