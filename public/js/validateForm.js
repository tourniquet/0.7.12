/* globals $ */

$().ready(() => {
  validateMyForm()
})

let validForm

var validateMyForm = function () {
  // get form id
  $('#new-Ad').validate({
    rules: {
      adName: {
        required: true,
        minlength: 3
      },
      adMessage: {
        required: true,
        minlength: 3
      },
      phone: {
        required: true,
        minlength: 5
      }
    },
    messages: {
      adName: 'Introduceţi titlul',
      adMessage: 'Introduceţi mesajul anunţului',
      phone: 'Introduceţi un număr de telefon valid'
    }
  })

  validForm = $('#new-Ad')
  validForm.validate()
}
