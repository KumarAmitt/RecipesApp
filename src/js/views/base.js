export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchRes: document.querySelector('.results'),
  searchResList: document.querySelector('.results__list')
}

export const renderLoader = parent => {
  const loader = `<div class="loader">
                    <svg>
                      <use href="img/icons.svg#icon-cw"></use>
                    </svg>
                  </div>`;

  parent.insertAdjacentHTML("afterbegin", loader);
}