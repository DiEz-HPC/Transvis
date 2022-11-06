const animationKeys = () => {
    const keys = [...document.getElementsByClassName('keyFigureNumber')];

    const animation = (key, max, add) => {
        const value = parseInt(key.innerHTML.replace(/,/g, '')) + add
        if (parseInt(key.innerHTML) < max) {
            if (parseInt(key.innerHTML) + add < max) {
                key.innerHTML = value;
            } else {
                key.innerHTML = max;
            }
        }
    }

    keys.map(key => {
        const max = parseInt(key.dataset.number);
        const animationTime = 1000;
        const timeout = 50;
        const add = Math.ceil(max / (animationTime / timeout));
        let interval
        const callback = (entries) => {
            entries.forEach(
                (entry) => {
                    if (entry.isIntersecting) {
                        interval = setInterval(() => {
                            animation(key, max, add)
                            if (parseInt(key.innerHTML) >= max) {
                                clearInterval(interval);
                            }
                        },  timeout);
                    } else {
                        clearInterval(interval);
                        key.innerHTML = 0;
                    }
                }
            );
        }

        const observer = new IntersectionObserver(callback, {
            rootMargin: '15px',
            threshold: 1
        });

        observer.observe(key)

    });
}

window.onload = () => {
    animationKeys();
}
