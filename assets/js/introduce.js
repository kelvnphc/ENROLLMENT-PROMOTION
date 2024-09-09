// Js code to carousel
let next_v1 = document.querySelector('.next-v1');
let prev_v1 = document.querySelector('.prev-v1');

next_v1.addEventListener('click', function () {
    let items_v1 = document.querySelectorAll('.item-v1');
    document.querySelector('.slide-v1').appendChild(items_v1[0]);
});

prev_v1.addEventListener('click', function () {
    let items_v1 = document.querySelectorAll('.item-v1');
    document.querySelector('.slide-v1').prepend(items_v1[items_v1.length - 1]);
});

// Js to card location