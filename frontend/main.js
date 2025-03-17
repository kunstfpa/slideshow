window.onload = function () {
    var video = document.getElementById("video");
    var img = document.getElementById("img");
    var index = 0;
    var mediadir = "../media/";
    var media;
    var files = [];
    var file;
    var timeoutID;

    function refresh() {
        $.ajaxSetup({
            async: false
        });
        $.getJSON("http://localhost:8080/", function (json) {
            media = json;
            files = Object.keys(media);
        });
        $.ajaxSetup({
            async: true
        });
    }

    function slide() {
        if (index == 0) {
            refresh()
        }
        file = files[index++ % files.length];
        if (file.endsWith(".mp4")) {
            video.src = mediadir.concat(file);
            video.style.display = "inline";
            img.style.display = "none"
        } else {
            img.src = mediadir.concat(file);
            img.style.display = "inline";
            video.style.display = "none";
            timeoutID = setTimeout(slide, media[file] * 1000);
        }
    }
    $.getJSON("http://localhost:8080/", function (json) {
        refresh();
        slide()
    });
    // Click toggles between slideshow and still
    document.querySelector("html").addEventListener("click", function () {
        if (timeoutID === undefined) {
            slide()
        } else {
            clearTimeout(timeoutID);
            timeoutID = undefined;
        }
    });
    document.querySelector("video").onended = (event) => {
        slide()
      };
}
