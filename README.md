# ToDo List

Aplicativo mobile desenvolvido em **React Native** e **TypeScript**, utilizando os padrões arquiteturais **MVVM**, **Inversão de Dependência (DI)** e **testes automatizados**. O projeto foi criado para a disciplina de Engenharia de Software.

---

## Descrição do Projeto

O sistema consiste em uma ToDo List que permite criar, listar, visualizar e gerenciar tarefas. O aplicativo é dividido em três telas principais:

1. Lista de Tarefas
2. Criar Tarefa
3. Detalhes da Tarefa

A arquitetura foi planejada para garantir organização, reuso de código, testabilidade e facilidade de manutenção.

---

## Estrutura do Projeto

```
src/
  model/
    entities/
      Task.ts
      RootStackParamList.ts
    services/
    repositories/
  viewmodel/
  view/
  test/
```

---

## Aplicação da Arquitetura MVVM

O padrão **Model-View-ViewModel (MVVM)** foi utilizado para estruturar o projeto de forma modular e escalável.

- **Model**
Contém as entidades, regras de negócio, repositórios e serviços. Representa o domínio da aplicação, sendo independente da interface. Inclui os modelos de dados e as implementações de acesso ao repositório de tarefas.

- **ViewModel**
Centraliza e gerencia o estado exibido pela View. Processa entradas do usuário, executa validações, chama métodos do Model e expõe estados prontos para renderização. É totalmente testável, pois não possui dependência direta da UI.

- **View**
Representa a interface do usuário. Exibe dados vindos da ViewModel e envia comandos de interação. Não contém lógica de negócio.

---

## Inversão de Dependências (DI)

A Inversão de Dependências foi aplicada ao serviço responsável pela persistência das tarefas.
O repositório de tarefas é acessado através de uma interface, permitindo substituir a implementação conforme necessário (por exemplo, uso de mock nos testes). Isso facilita testes unitários, desacopla camadas e melhora a escalabilidade do projeto.

---

## Testes Automatizados

Foram implementados testes utilizando **Jest** com foco na camada de lógica de negócio.

Os testes incluem:

* Testes unitários da ViewModel
* Testes das funções relacionadas ao CRUD de tarefas
* Uso de mocks para isolar dependências e garantir reprodutibilidade

O diretório `test/` contém todos os arquivos de testes organizados por módulos.

---

## Instalação e Execução do Aplicativo

### Pré-requisitos

* Node.js 18 ou superior
* npm ou yarn
* Expo CLI instalada globalmente (opcional)

### Passo a passo

1. **Clonar o repositório**

   ```bash
   git clone https://github.com/Isabellybrt/ToDo-List-MVVM.git
   cd ToDo-List-MVVM
   ```

2. **Instalar dependências**

   ```bash
   npm install
   ```

   ou

   ```bash
   yarn install
   ```

3. **Executar o aplicativo**

   ```bash
   npx expo start
   ```

---

## Execução dos Testes

1. Certifique-se de que as dependências já estão instaladas.
2. Execute:

   ```bash
   npm test
   ```

   ou

   ```bash
   yarn test
   ```

Os testes serão executados no Jest e o relatório aparecerá no terminal.

---

## Equipe

* [larissaNa](https://github.com/larissaNa)
* [Isabellybrt](https://github.com/Isabellybrt)
* [Luis-Sampaio1](https://github.com/Luis-Sampaio1)
* [julioCerqueira-git](https://github.com/julioCerqueira-git)
* [vanessapereiracunha](https://github.com/vanessapereiracunha)

