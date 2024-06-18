# ToDo List 

## Requisitos
- Servidor Web (Apache ou Nginx)
- PHP
- MySQL

## Configuração do Banco de Dados
1. Crie o banco de dados:
    ```sql
    CREATE DATABASE todo_list;
    ```
2. Crie a tabela:
    ```sql
    CREATE TABLE tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    ```

## Configuração do Projeto
1. Clone o repositório:
    ```sh
    git clone <URL do Repositório>
    ```
2. Configure o banco de dados em `config.php`.

## Rodando a Aplicação
1. Inicie o servidor web.
2. Acesse
