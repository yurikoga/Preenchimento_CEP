document.getElementById('cep').addEventListener('blur', buscarCEP);
document.getElementById('btn-buscar').addEventListener('click', buscarCEP);

async function buscarCEP() {
    const cepInput = document.getElementById('cep').value;
    const cleanCEP = cepInput.replace(/\D/g, '');

    if (cleanCEP.length !== 8) {
        alert("Por favor, digite um CEP válido com 8 dígitos.");
        limparCampos();
        return;
    }

    const url = `https://viacep.com.br/ws/${cleanCEP}/json/`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro na requisição.");

        const data = await response.json();

        if (data.erro) {
            alert("CEP não encontrado.");
            limparCampos();
            return;
        }

        document.getElementById('estado').value = data.uf;
        document.getElementById('cidade').value = data.localidade;
        document.getElementById('bairro').value = data.bairro || 'Centro';
        document.getElementById('logradouro').value = data.logradouro || '';

        document.getElementById('numero').focus();

    } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
    }
}

function limparCampos() {
    document.getElementById('estado').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('logradouro').value = "";
}

// Máscara para adicionar o hífen (00000-000)
document.getElementById('cep').addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 5) {
        val = val.replace(/^(\d{5})(\d)/, '$1-$2');
    }
    e.target.value = val;
});
