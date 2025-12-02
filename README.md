# ToDo List MVVM

Aplicativo mobile desenvolvido em **React Native** e **TypeScript**, utilizando **Arquitetura MVVM**, **Inversão de Dependência (DI)** e **testes automatizados**.
Projeto desenvolvido para a disciplina de Engenharia de Software.

---

## Visão Geral

O **ToDo List MVVM** é um aplicativo de gerenciamento de tarefas que demonstra uma implementação limpa da arquitetura MVVM aliada a boas práticas de engenharia de software.
O usuário pode:

* Criar novas tarefas com título e descrição
* Listar todas as tarefas cadastradas
* Marcar tarefas como concluídas
* Excluir tarefas existentes

---

## Arquitetura MVVM

A estrutura do projeto segue o padrão **Model–View–ViewModel**, separando responsabilidades de forma clara.

### **Model**

* **Entidades:** Representam os dados do domínio (ex: `Task`)
* **Repositórios:** Interfaces e implementações de acesso a dados (ex: `TaskRepository`)
* **Serviços:** Camada de regras de negócio (ex: `TaskService`)

### **View**

* Componentes React Native responsáveis pela interface do usuário
* Não possuem lógica de negócio
* Recebem dados e ações via ViewModels

### **ViewModel**

* Faz a ponte entre Model e View
* Expõe estados, dados e funções
* Reage às ações do usuário e manipula a lógica da aplicação através dos serviços

---

## 1. Interface como Contrato
O acesso a dados ocorre via a interface `ITaskRepository`:

```ts
export interface ITaskRepository {
  getAll(): Task[];
  add(task: Task): void;
  update(task: Task): void;
  delete(id: number): void;
}
```

- O serviço depende da **abstração**, não da implementação concreta.  
- Isso permite trocar facilmente a implementação por **mocks** nos testes.  
- Aqui aplicamos o **princípio da Inversão de Dependência (ID)**.

---

## 2. Serviço Recebendo Dependências via DI
O `TaskService` recebe a implementação do repositório por meio do construtor:

```ts
export class TaskService {
  constructor(private repository: ITaskRepository) {}
}
```

- O serviço **não cria** a dependência, apenas a utiliza.  
- A dependência é **injetada de fora para dentro**, aplicando **Injeção de Dependência (DI)**.

---

## 3. DI nos ViewModels
Os ViewModels também recebem suas dependências, permitindo substituição em tempo de teste:

```ts
export const useHomeViewModel = (service: TaskService = defaultService) => {
};
```

Nos testes:
```ts
const mockService = new TaskService(mockRepository);
```

- A camada superior depende da abstração, não da implementação.  
- Isso reforça o uso da **Inversão de Dependência**.

---

## 4. Diferença entre ID e DI
- **Inversão de Dependência (ID)** → é o **princípio**: módulos de alto nível devem depender de abstrações, não de implementações.  
- **Injeção de Dependência (DI)** → é a **técnica**: como fornecemos essas dependências (via construtor, setter ou propriedade).  

👉 Em resumo:  
- **ID** é o *"o que"* (depender de abstrações).  
- **DI** é o *"como"* (injetar a implementação concreta).

---

## 5. Benefícios da DI e ID
- 🔹 Redução de acoplamento entre camadas  
- 🔹 Testes mais simples com mocks e stubs  
- 🔹 Facilidade para trocar implementações futuramente  
- 🔹 Código mais limpo e flexível  
- 🔹 Aderência aos princípios do **SOLID**

---

### **4. Benefícios da DI**

* Redução de acoplamento entre camadas
* Testes mais simples com mocks e stubs
* Facilidade para trocar implementações futuramente
* Código mais limpo e flexível
* Aderência aos princípios do SOLID

---

## Como Executar o Projeto

### **Pré-requisitos**

* Node.js 16+
* npm ou yarn
* Expo CLI instalada globalmente:

```bash
npm install -g expo-cli
```

### **Instalação**

1. Clone o repositório:

   ```bash
   git clone https://github.com/Isabellybrt/ToDo-List-MVVM.git
   cd ToDo-List-MVVM
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm start
   ```

4. Utilize o aplicativo Expo Go ou um emulador para visualizar o app.

---

## Como Executar os Testes

O projeto utiliza **Jest** e **React Testing Library**.

### Rodar todos os testes:

```bash
npm test
```

### Gerar relatório de cobertura:

```bash
npm test -- --verbose
```

---

## 🗂 Estrutura do Projeto

```
src/
├── model/
│   ├── entities/       # Entidades do domínio
│   │   └── Task.ts
│   ├── repositories/   # Interfaces e repositórios concretos
│   │   ├── ITaskRepository.ts
│   │   └── TaskRepository.ts
│   └── services/       # Serviços (regras de negócio)
│       └── TaskService.ts
│
├── view/               # Componentes de interface
│   ├── CreateTask.tsx
│   ├── HomeScreen.tsx
│   └── TaskDetails.tsx
│
├── viewmodel/          # Lógica de apresentação
│   ├── CreateTaskViewModel.ts
│   ├── HomeViewModel.ts
│   └── TaskDetailsViewModel.ts
│
└── __tests__/
    ├── service/        # Testes dos serviços
    └── viewmodel/      # Testes dos ViewModels
    └── repositories    # Testes de Repositorio
```

---

## 👥 Autores

* Larissa Souza do Nascimento [2024116TADS0027] - [larissaNa](https://github.com/larissaNa)
* Maria Isabelly de Brito Rodrigues [2024116TADS0020] - [Isabellybrt](https://github.com/Isabellybrt)
* Luis Guilherme Sampaio Fontenele [2024116TADS0031] - [Luis-Sampaio1](https://github.com/Luis-Sampaio1)
* Júlio Cerqueira Pires [2024116TADS0004] - [julioCerqueira-git](https://github.com/julioCerqueira-git)
*  Vanessa Pereira Cunha [2024116TADS0023] - [vanessapereiracunha](https://github.com/vanessapereiracunha)

---

## 📄 Licença

Projeto licenciado sob a licença **MIT**.

