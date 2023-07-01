const modal = document.querySelector('.backdrop-js');
<<<<<<< Updated upstream
function handleClick(event) {
  event.preventDefault();
  const target = event.target;
  if (target.closest('.card-book-link')) {
    console.log('Клік');
    modal.classList.toggle('visually-hidden');
  }
}

function addEventListenersToRenderContainer() {
  const renderContainer = document.querySelector('.render-container-js');
  if (renderContainer) {
    renderContainer.addEventListener('click', handleClick);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  addEventListenersToRenderContainer();
});
=======
const closeButton = modal.querySelector('.modal-close');
const addToShoppingListButton = modal.querySelector('.btn--current');
const infoText = modal.querySelector('.info-text');
const modalTitle = modal.querySelector('.modal-content-title');
const modalSubtitle = modal.querySelector('.modal-content-subtitle');
const modalPrimaryText = modal.querySelector('.modal-content__primary-text');
const modalLinks = modal.querySelector('#modal-links');

const API_ENDPOINT = 'https://books-backend.p.goit.global';

function openModal() {
  modal.classList.remove('visually-hidden');
  closeButton.addEventListener('click', closeModal);
  disableScroll();
}

function closeModal() {
  modal.classList.add('visually-hidden');
  closeButton.removeEventListener('click', closeModal);
  enableScroll();
}

function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = '';
}

function handleLogoClick(event) {
  event.stopPropagation();
  window.open(event.target.href, '_blank');
}

function handleAddToShoppingList() {
  addToShoppingListButton.textContent = 'Remove from the shopping list';
  infoText.textContent = 'Congratulations! You have successfully added the book to your shopping list.';
  infoText.style.color = 'rgba(255, 255, 255, 0.5)'; 
  infoText.style.fontWeight = '400';
  infoText.style.fontSize = '10px';
  infoText.style.align = 'center';
  infoText.style.weight = '242px';

  infoText.classList.remove('visually-hidden');
}

function loadBookData(bookData) {
  const { title, author, description, buy_links: buyLinks } = bookData;

  modalTitle.textContent = title;
  modalSubtitle.textContent = author;
  modalPrimaryText.textContent = description;

  modalLinks.innerHTML = '';
  buyLinks.forEach((buyLink) => {
    const link = document.createElement('a');
    link.href = buyLink.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.addEventListener('click', handleLogoClick);

    const logo = document.createElement('img');
    logo.src = buyLink.logo;
    logo.alt = buyLink.store;

    link.appendChild(logo);
    modalLinks.appendChild(link);
  });

  addToShoppingListButton.addEventListener('click', handleAddToShoppingList);
}

function fetchBookData(bookId) {
  const url = `${API_ENDPOINT}/books/${bookId}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    });
}

function handleBookClick(event) {
  event.preventDefault();
  const cardBook = event.target.closest('.card-book');
  if (!cardBook) {
    return;
  }

  const bookId = cardBook.querySelector('.card-book-id').textContent;

  if (bookId) {
    fetchBookData(bookId)
      .then(bookData => {
        loadBookData(bookData);
        openModal();
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
      });
  }
}

const bookGrid = document.querySelector('.books-render-js');
bookGrid.addEventListener('click', handleBookClick);
>>>>>>> Stashed changes
