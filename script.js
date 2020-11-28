function easeOutExpo(t, b, c, d) {
    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
}



window.addEventListener("load", function() {
    var load = document.getElementsByClassName("load")[0];
    var hero = document.getElementsByClassName("hero")[0];
    load.classList.remove("load--active");
    hero.classList.remove("hero--inactive");
}, true);



var sections = document.getElementsByClassName("section");
var sectionTops = []
for (var i = 0; i < sections.length; i++) {
    var sectionTop = sections[i].getBoundingClientRect().top + window.pageYOffset;
    sectionTops.push(sectionTop);
}

window.addEventListener("scroll", function() {
    var windowY = window.pageYOffset;
    var windowH = window.innerHeight;
    for (var i = 0; i < sections.length; i++) {
        if (windowY + 0.8 * windowH > sectionTops[i]) {
            sections[i].classList.remove("section--fade");
        }
    }
}, false);



var menuLinks = document.getElementsByClassName("menu__link");
var destinationTops = {};
for (var i = 0; i < menuLinks.length; i++) {
    var destinationId = menuLinks[i].getAttribute("href").slice(1);
    var destination = document.getElementById(destinationId);
    var destinationTop = destination.getBoundingClientRect().top + window.pageYOffset;
    destinationTops[menuLinks[i]] = destinationTop;
}

for (var i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener("click", function(event) {
        var destinationTop = destinationTops[event.target];

        var fromX = window.pageXOffset;
        var fromY = window.pageYOffset;
        var toY = Math.min(destinationTop, document.body.clientHeight - window.innerHeight);

        var time = 0;
        var duration = 60;
        (function smoothScroll() {
            window.scrollTo(fromX, easeOutExpo(time, fromY, toY, duration))
            if (time < duration) {
                window.requestAnimationFrame(smoothScroll);
            }
            time++;
        })();
    }, false);
}
