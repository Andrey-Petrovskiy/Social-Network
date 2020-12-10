window.onload = function () {
    const placeholder = document.querySelector(".avatar-image"),
          dropdown = document.querySelector(".dropdown"),
          header = document.querySelector('.header');

    placeholder.addEventListener('click', () => {
        dropdown.classList.toggle('dropdown-show');
    });

    header.addEventListener('click', (e) => {
        if (e.target !== placeholder) {
            dropdown.classList.remove('dropdown-show');
        }
    });
};