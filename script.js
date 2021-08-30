const load = document.getElementsByClassName("load")[0];
const hero = document.getElementsByClassName("hero")[0];

window.addEventListener("load", function() {
    load.classList.add("load--inactive");
    hero.classList.remove("hero--fade");
}, true);



const sections = document.getElementsByTagName("section");
const sectionTops = []
for (var i = 0; i < sections.length; i++) {
    const sectionTop = sections[i].getBoundingClientRect().top + window.pageYOffset;
    sectionTops.push(sectionTop);
}

window.addEventListener("scroll", function() {
    var y = window.pageYOffset;
    var h = window.innerHeight;
    for (var i = 0; i < sections.length; i++) {
        if (y + h * 0.8 > sectionTops[i]) {
            sections[i].classList.remove("fade");
        }
        else {
            sections[i].classList.add("fade");
        }
    }
}, false);



function easeOutExpo(t, b, c, d) {
    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
}

const nav = document.getElementsByTagName("nav")[0];
const anchors = nav.getElementsByTagName("a");

for (var i = 0; i < anchors.length; i++) {
    const anchor = anchors[i];

    const articleId = anchor.getAttribute("href").slice(1);
    const article = document.getElementById(articleId);
    const articleTop = article.getBoundingClientRect().top + window.pageYOffset;

    anchor.addEventListener("click", function() {
        var xFrom = window.pageXOffset;
        var yFrom = window.pageYOffset;
        var yTo = Math.min(articleTop, document.body.clientHeight - window.innerHeight);

        var start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            var progress = timestamp - start;
            window.scrollTo(xFrom, easeOutExpo(progress, yFrom, yTo, 1000));
            if (progress < 1000) {
                window.requestAnimationFrame(step);
            }
        }
          
        window.requestAnimationFrame(step);
    }, false);
}
