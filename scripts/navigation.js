const navBar = document.querySelector('#nav-bar');

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('#navButton');
    if (button) {
        button.addEventListener('click', () => {
            button.classList.toggle('show')
            navBar.classList.toggle('show');
        });
    }
});