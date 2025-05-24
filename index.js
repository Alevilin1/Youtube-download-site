const botaoYoutube = document.getElementById("botaoYoutube");
const inputYoutube = document.getElementById("inputYoutube");
const mensagemErro = document.getElementById("mensagem-erro");
const divInput = document.getElementById("div-input");
const divLoading = document.getElementById("div-loading");

mensagemErro.style.display = "none";
divLoading.style.display = "none";

botaoYoutube.addEventListener("click", baixandoVideo);

async function baixandoVideo() {
    mensagemErro.style.display = "none";


    const url = inputYoutube.value;


    console.log(url.split('/'));

    if (url.split('/')[2] == "www.youtube.com") {

        divInput.style.display = "none";
        divLoading.style.display = "flex";

        const requisicao = await fetch("https://199a-2804-1468-880a-3300-b18c-8bbd-54cd-c5aa.ngrok-free.app/video", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
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

            divInput.style.display = "flex";
            divLoading.style.display = "none";
        }
    } else {
        mensagemErro.style.display = "flex";
    }

}