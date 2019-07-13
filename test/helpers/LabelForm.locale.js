import { decorate } from '../../src/localization';

export default {
  en: {
    button: 'Save',
    color: 'Color',
    description: 'Description',
    message: {
      error: decorate('<0>Error</0> : label has not been created successfully.'),
      success: decorate('[INFO] <0>Success</0> : label has been created successfully!'),
    },
    title: 'Creating label',
  },
  pt: {
    button: 'Gravar',
    color: 'Cor',
    description: 'Descrição',
    message: {
      error: decorate('<0>Erro</0> : label <1>não</1> foi criado com <1>sucesso</1>.'),
      success: decorate('[INFO] <0>Sucesso</0> : label foi criado com <1>sucesso</1>!'),
    },
    title: 'Criando label',
  },
};
