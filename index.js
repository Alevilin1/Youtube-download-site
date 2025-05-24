const botaoYoutube = document.getElementById("botaoYoutube");
const inputYoutube = document.getElementById("inputYoutube");
const mensagemErro = document.getElementById("mensagem-erro");

mensagemErro.style.display = "none";


botaoYoutube.addEventListener("click", baixandoVideo);

async function baixandoVideo() {
    mensagemErro.style.display = "none";
    const url = inputYoutube.value;


    console.log(url.split('/'));

    if (url.split('/')[2] == "www.youtube.com") {
        const requisicao = await fetch("http://localhost:3000/video", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: url
            })
        });

        const data = await requisicao.json();
        if (data.downloadUrl) {
            const a = document.createElement("a");
            a.href = data.downloadUrl;
            a.download = "";
            a.click();
        }
    } else {
        mensagemErro.style.display = "flex";
    }

}