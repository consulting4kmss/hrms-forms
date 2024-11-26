function nextPage(pageNumber) {
    const currentPage = document.querySelector(`#form2-page${pageNumber - 1}`);
    const nextPage = document.querySelector(`#form2-page${pageNumber}`);
    currentPage.style.display = 'none';
    nextPage.style.display = 'block';
}

function previousPage(pageNumber) {
    const currentPage = document.querySelector(`#form2-page${pageNumber + 1}`);
    const previousPage = document.querySelector(`#form2-page${pageNumber}`);
    currentPage.style.display = 'none';
    previousPage.style.display = 'block';
}
