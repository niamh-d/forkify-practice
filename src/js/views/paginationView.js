import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _currPage;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    this._currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 and there are other pages
    if (this._currPage === 1 && numPages > 1) {
      return this._generateMarkupButton('right');
    }
    // On last page
    if (this._currPage === numPages && numPages > 1) {
      return this._generateMarkupButton('left');
    }
    // On other page
    if (this._currPage < numPages) {
      return (
        this._generateMarkupButton('left') + this._generateMarkupButton('right')
      );
    }
    //Page 1 and no other pages
    return '';
  }

  _generateMarkupButton(direction) {
    const directionIsLeft = direction === 'left';
    return `<button data-goto="${
      directionIsLeft ? this._currPage - 1 : this._currPage + 1
    }" class="btn--inline pagination__btn--${
      directionIsLeft ? 'prev' : 'next'
    }">
<svg class="search__icon">
  <use href="${icons}#icon-arrow-${directionIsLeft ? 'left' : 'right'}"></use>
</svg>
<span>Page ${directionIsLeft ? this._currPage - 1 : this._currPage + 1}</span>
</button>`;
  }
}

export default new PaginationView();
