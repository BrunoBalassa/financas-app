import toastr from 'toastr'
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
export function mostrarMsg(titulo, msg, tipo) {
    toastr[tipo](msg, titulo)
}
export function msgErro(msg){
    mostrarMsg('Erro', msg, 'error')
}
export function msgSuccess(msg){
    mostrarMsg('Sucesso', msg, 'success')
}
export function msgalerta(msg){
    mostrarMsg('Alerta', msg, 'warning')
}