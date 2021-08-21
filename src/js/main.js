window.addEventListener('DOMContentLoaded', () => {

    //Scrolling

    const btns = document.querySelectorAll('#scroll'),
          footer = document.querySelector('.order');  
          
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.documentElement.scrollTop = footer.offsetTop;
        })
    })



    //Form

    const form = document.querySelector('.order-form'),
          inputs = form.querySelectorAll('.order-form__item input'),
          prompts = form.querySelectorAll('.order-form__prompt');
console.log(form)
    inputs.forEach((input, i) => {
        input.addEventListener('focus', () => {
            prompts[i].style.display = 'block';
        })
        input.addEventListener('blur', () => {
            prompts[i].style.display = 'none';
        })
    })

    // Slider

    const sliderWindow = document.querySelector('.reviews-slider'),
          sliderWrapper = document.querySelector('.reviews-slider__wrapper'),
          slides = document.querySelectorAll('.reviews-slider__item'),
          dots = document.querySelectorAll('.reviews-slider__dot'),
          width = (+window.getComputedStyle(sliderWindow).width.replace(/\D/gi, ''));

          sliderWrapper.style.width = (width * slides.length + 'px');
          dots[0].style.backgroundColor = 'blue';
          

        let position = 0;
        console.log(dots.length)

        sliderWrapper.style.transform = `translateX(${position})`;

        window.addEventListener('resize', onResize);

        function onResize() {
            const sliderWindow = document.querySelector('.reviews-slider'),
                    width = (+window.getComputedStyle(sliderWindow).width.replace(/\D/gi, ''));
            sliderWrapper.style.width = (width * slides.length + 'px');
        }

        function scrollSlides(pos) {
            console.log(pos)
            sliderWrapper.style.transform = `translateX(-${pos}px)`;
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', (e) => {
                dots.forEach(dot => dot.style.backgroundColor = '#fff');
                dots[i].style.backgroundColor = 'blue';
                e.preventDefault();
                position = (width * i);
                scrollSlides(position);
            })
        })

        // Timer

        let deadTime = 1800000;

        
    function getTimeRemaining(endtime) {
        const t = endtime,
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime -= 1000);

            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }


    setClock('.order__timer-wrapper', deadTime);

//Phone input

   const inputPhone =  document.querySelector('#phone');

   inputPhone.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/gi, '');
})

})