const navBar = document.querySelector('.navigation');

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.hamburger');
    if (button) {
        button.addEventListener('click', () => {
            button.classList.toggle('show')
            navBar.classList.toggle('show');
        });
    }
});