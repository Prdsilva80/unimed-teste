// Adiciona um ouvinte de evento para o campo "possuiPlano"
document.getElementById('possuiPlano').addEventListener('change', function () {
    var nomePlanoContainer = document.getElementById('nomePlanoContainer');
    
    // Limpa o campo do nome do plano quando a opção "Não" é selecionada
    nomePlanoContainer.style.display = (this.value === 'nao') ? 'block' : 'none';

    // Altera a linha abaixo para verificar se o valor é 'Sim'
    if (this.value === 'sim') {
        document.getElementById('nomePlano').value = '';
    }
});

// Adiciona um ouvinte de evento para o formulário
document.getElementById('meuFormulario').addEventListener('submit', function (event) {
    // Obtém o valor do campo "Possui plano de saúde?"
    var possuiPlano = document.getElementById('possuiPlano').value;

    // Verifica se a opção "Sim" foi selecionada para exibir ou não o campo "Nome do Plano de Saúde"
    if (possuiPlano === 'sim') {
        var nomePlano = document.getElementById('nomePlano').value;
        // Verifica se o campo "Nome do Plano de Saúde" está vazio
        if (!nomePlano.trim()) {
            exibirAlerta('Por favor, preencha o campo "Nome do Plano de Saúde".');
            event.preventDefault();
            return; // Impede o envio do formulário se o campo estiver vazio
        }
    }

    // Restante do código para realizar a chamada AJAX
    realizarChamadaAjax();
});

// Função para realizar a chamada AJAX
function realizarChamadaAjax() {
    const servername = "localhost";
    const username = "root";
    const password = "";
    const dbname = "avaliacao_programador";

    const sql = `CREATE TABLE CLIENTE (
        ID INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
        NOME VARCHAR(80) NOT NULL,
        EMAIL VARCHAR(80) NOT NULL,
        POSSUI_PLANO CHAR(1),
        PLANO VARCHAR(80)
    )`;

    $.ajax({
        type: "POST",
        url: "criar_tabela.php",
        data: {
            servername: servername,
            username: username,
            password: password,
            dbname: dbname,
            sql: sql
        },
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.error(error);
        }
    });
}

// Função para exibir mensagens de alerta
function exibirAlerta(mensagem) {
    // Exibe a mensagem de alerta na div com o ID "alertaContainer"
    var alertaContainer = document.getElementById('alertaContainer');
    alertaContainer.innerHTML = `<p>${mensagem}</p>`;
}
