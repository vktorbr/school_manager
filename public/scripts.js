const cards = document.querySelectorAll(".card");

for (const card of cards) {
    card.addEventListener("click", function(){
        let title = card.querySelector(".cardTitle p").textContent.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9 ]/g, "").replace("  ", " ").replace(/ /g, "-");
        window.location.href = `/post/${title}`;
        //iframe.src = `https://blog.rocketseat.com.br/${title}`;
    })
}
