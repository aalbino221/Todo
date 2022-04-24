/* 
4 Módulos
1 - Criar tasks
2 - Organizar tasks
3 - Modificar tasks
4 - Manipular DOM

1 - Criar Task
    Pedir ao usúario por uma nova task, que ira ter os seguintes parametros:
    1 - Titulo
    2 - Description
    3 - Date
    4 - Priority
    Essa task será um objeto
    Uma função ira  criar a nova task a partir de uma class(?)

2 - Organizar tasks
    1 - Colocar no array allTasks = []
    2 - Se  a task for de um projeto, colocar também no array projeto = [] , a partir de uma class (?), allTasks[][] (?)
    3 - Loopar pelo allTasks[]
        3.1 - Definir parametors e colocar no array today[]
        3.2 - Definir parametros e colocar no array thisWeek[]
        3.3 - Definir parametros e colocar no array important[]
        3.4 - Definir parametros e colocar no array completed[]
        3.5 - Definir parametros e colocar no array failed[]

3 - Modificar tasks
    1 - Manipular o objeto da task, titulo, data, se foi completo
    2 - Excluir task

4 - Manipular DOM
    1 - Content se atualizar lendo o array
    2 - Construir content
        2.1 - All Tasks -> loope no allTasks[]
        2.2 - This Week -> loope no thisWeek[]
        2.3 - Important -> loope no important[]
        2.4 - Completed -> loope no completed[]
        2.5 - Failed -> loope no failed[]
    2 - PubSub(?)
*/