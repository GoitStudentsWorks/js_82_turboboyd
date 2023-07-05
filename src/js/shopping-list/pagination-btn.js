import {
  currentPage,
  setCurrentPage,
  shoppingListKey,
  renderShoppingList,
  OnClickrenderShoppingList,
} from './pagination';
import parseStorage from './parse-storage';
import { arrowLeftMarcup, arrowRightMarcup } from './arrow-marcup';
export const btnListPaginationEl = document.querySelector('.pagination-list');
export let countPerPage = isMobile() ? 4 : 3;
let countBtnOfPage = isMobile() ? 2 : 3;
let btnMore = document.querySelector('.more-btn-pagination');
let leftContainer = document.querySelector('.pagination-btn-left');
let rightContainer = document.querySelector('.pagination-btn-right');
const paginationWrapEl = document.querySelector('.pagination-wrap');

export function renderBtnList(data) {
  const pageCount = allPage();
  if (pageCount === 1) {
    if (leftContainer && rightContainer) {
      removeArrow();
    }
    renderBtnPerPage();
  } else {
    if (!leftContainer && !rightContainer) {
      createArrow();
    }
    renderBtnPerPage();
  }
  if (pageCount > countBtnOfPage) {
    createBtnMore();
  }
  if (pageCount <= countBtnOfPage && btnMore) {
    btnMore.remove();
  }
}

function renderBtnPerPage() {
  const pageCount = allPage();
  let start;
  let end;
  if (isMobile()) {
    start = currentPage > 1 ? currentPage : 1;
    end = currentPage < pageCount ? currentPage + 1 : pageCount;
    if (currentPage === pageCount) {
      start = currentPage - 1;
      end = pageCount;
    }
    if (pageCount <= countBtnOfPage) {
      start = 1;
      end = pageCount;
    }
  } else {
    start = currentPage > 1 ? currentPage - 1 : 1;
    end = currentPage - 1 < pageCount ? currentPage + 1 : pageCount;
    if (currentPage === 1) {
      end = currentPage + 2;
    }
    if (currentPage === pageCount) {
      start = currentPage - 2;
      end = pageCount;
    }
    if (pageCount <= countBtnOfPage) {
      start = 1;
      end = pageCount;
    }
  }
  const arrBtnPage = [];
  for (let i = start; i <= end; i += 1) {
    const btnEl = `<li class="pagination-item"><button type="button" class="pagination-btn">${i}</button></li>`;
    arrBtnPage.push(btnEl);
  }
  const marcupBtn = arrBtnPage.join('');
  btnListPaginationEl.innerHTML = marcupBtn;
  btnListPaginationEl.addEventListener('click', OnClickrenderShoppingList);
}

export function isMobile() {
  const screenWidth = window.innerWidth;
  const isMobile = screenWidth < 768;
  return isMobile;
}
export function allPage() {
  const data = parseStorage(shoppingListKey);
  const pageCount = Math.ceil(data.length / countPerPage);
  return pageCount;
}

function createAllBtn() {
  const pageCount = allPage();
  const arrBtnPage = [];
  for (let i = 1; i <= pageCount; i += 1) {
    const btnEl = `<li class="pagination-item"><button type="button" class="pagination-btn">${i}</button></li>`;
    arrBtnPage.push(btnEl);
  }
  const marcupBtn = arrBtnPage.join('');
  btnListPaginationEl.innerHTML = marcupBtn;
}

function createArrow() {
  leftContainer = document.createElement('ul');
  leftContainer.innerHTML = arrowLeftMarcup();
  paginationWrapEl.prepend(leftContainer);
  leftContainer.classList.add('nav-pagination-btn', 'pagination-btn-left');

  rightContainer = document.createElement('ul');
  rightContainer.innerHTML = arrowRightMarcup();
  paginationWrapEl.append(rightContainer);
  rightContainer.classList.add('nav-pagination-btn', 'pagination-btn-right');
  addEventListenerToArrowBtn();
}

function removeArrow() {
  leftContainer.remove();
  rightContainer.remove();
}

function createBtnMore() {
  if (!btnMore) {
    btnMore = document.createElement('button');
    btnMore.textContent = '...';
    btnListPaginationEl.after(btnMore);
    btnMore.classList.add('pagination-btn-nav', 'more-btn-pagination');
    btnMore.addEventListener('click', OnClickMoreBtn);
  }
}

function OnClickMoreBtn() {
  createAllBtn();
  btnMore.remove();
}

function addEventListenerToArrowBtn() {
  const btnGoToFirstPage = document.querySelector(
    'button[data-go-to="first-page"]'
  );
  const btnGoToPreviosPage = document.querySelector(
    'button[data-go-to="previos-page"]'
  );

  const btnGoToNextPage = document.querySelector(
    'button[data-go-to="next-page"]'
  );
  const btnGoToLastPage = document.querySelector(
    'button[data-go-to="last-page"]'
  );
  btnGoToFirstPage.addEventListener('click', OnClickGoToFirstPage);
  btnGoToPreviosPage.addEventListener('click', OnClickGoPreviosPage);
  btnGoToNextPage.addEventListener('click', OnClickGoToNextPage);
  btnGoToLastPage.addEventListener('click', OnClickGoToLastPage);
}

function OnClickGoToFirstPage() {
  const pageCount = allPage();
  if (currentPage > 1) {
    setCurrentPage(1);
    const data = parseStorage(shoppingListKey);
    renderShoppingList(data, currentPage);
    renderBtnList(data);
  }
}

function OnClickGoPreviosPage() {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
    const data = parseStorage(shoppingListKey);
    renderShoppingList(data, currentPage);
    renderBtnPerPage();
  }
}

function OnClickGoToNextPage() {
  const pageCount = allPage();
  if (currentPage < pageCount) {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
    const data = parseStorage(shoppingListKey);
    renderShoppingList(data, currentPage);
    renderBtnPerPage();
    console.log(currentPage);
  }
}

function OnClickGoToLastPage() {
  const pageCount = allPage();
  if (currentPage !== pageCount) {
    setCurrentPage(pageCount);
    const data = parseStorage(shoppingListKey);
    renderShoppingList(data, currentPage);
    renderBtnPerPage();
  }
}

// export function addClassListToCurrentBtn(page) {
//   const btnListPaginationEl = document.querySelector('.pagination-list');
//   if (
//     btnListPaginationEl &&
//     document.querySelector('.current-btn-pagination')
//   ) {
//     const previousPage = document.querySelector('.current-btn-pagination');
//     previousPage.classList.remove('current-btn-pagination');
//   }

//   if (btnListPaginationEl && btnListPaginationEl.childElementCount !== 0) {
//     const currentBtn =
//       btnListPaginationEl.children[page - 1].querySelector('button');
//     if (currentBtn) {
//       currentBtn.classList.add('current-btn-pagination');
//     }
//   }
// }
