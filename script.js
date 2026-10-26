const formulario = document.getElementById("form");
const inputUrl = document.getElementById("youtubeUrl");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const url = inputUrl.value.trim();

    if (!url) {
        mensagem.textContent = "Informe uma URL do YouTube.";
        return;
    }

    mensagem.textContent = "Realizando conversão...";

    try {
        const resposta = await fetch("http://localhost:8081/convert/download", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: url })
        });

        const resultado = await resposta.text();

        if (!resposta.ok) {
            throw new Error(resultado || `Erro HTTP ${resposta.status}`);
        }

        console.log("Resposta do servidor:", resultado);
        mensagem.textContent = "Conversão realizada com sucesso!";

    } catch (erro) {
        console.error("Erro na conversão:", erro);
        mensagem.textContent = `Erro: ${erro.message}`;
    }
});