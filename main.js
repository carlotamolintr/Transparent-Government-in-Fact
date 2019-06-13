function readButton(btn, id) {
    var button = document.getElementById(id);


    if (button.style.display === "block") {
        button.style.display = "none";
        btn.innerHTML = "Read more";

    } else {
        button.style.display = "none";
        btn.innerHTML = "Read less";
        button.style.display = "block";

    }

}