class DeleteButton {
  rcnt: HTMLDivElement;
  button: HTMLButtonElement;
  isDeleting: boolean;

  constructor(rcnt: HTMLDivElement) {
    this.rcnt = rcnt;
    this.button = this.createButton();
    this.isDeleting = false; // flag to prevent double click
    this.updateButtonState();
    this.button.addEventListener("click", this.handleDeleteClick.bind(this));
  }

  createButton() {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-first-btn");
    deleteButton.textContent = "Delete First Result";

    const btnIcon = document.createElement("img");
    btnIcon.src = chrome.runtime.getURL("/icons/icon32.png");
    deleteButton.prepend(btnIcon);

    return deleteButton;
  }

  updateButtonState() {
    const resultsParentEl = document
      .querySelector("#search")
      ?.querySelector("h1")?.nextElementSibling;

    // If no search results, we add "disabled" styles
    resultsParentEl?.children.length === 0
      ? this.button.classList.add("disabled")
      : this.button.classList.remove("disabled");
  }

  // Get search result height INCLUDING margins
  getSearchResultHeight(searchResultEl: HTMLElement) {
    const searchResultElHeight = parseFloat(getComputedStyle(searchResultEl).height);
    const searchResultElMarginBottom = parseFloat(
      getComputedStyle(searchResultEl).marginBottom
    );

    // inner div (firstResult > div > div) that could have margin
    const innerWrapper = searchResultEl?.querySelector("div > div");
    const innerWrapperMarginBottom = innerWrapper
      ? parseFloat(getComputedStyle(innerWrapper).marginBottom)
      : 0;

    const height = `${
      searchResultElHeight +
      Math.max(searchResultElMarginBottom, innerWrapperMarginBottom)
    }`;

    return height;
  }

  handleDeleteClick() {
    if (this.isDeleting) return; // to prevent double click

    const resultsParentEl = document
      .querySelector("#search")
      ?.querySelector("h1")?.nextElementSibling;
    const firstResultEl = resultsParentEl?.firstElementChild as HTMLElement;

    if (!firstResultEl) return;

    // if (resultsParentEl?.children.length === 0) {
    //   return;
    // }

    // We set this flag to true,
    // to prevent double clicking the button
    this.isDeleting = true;

    // Here we define the nesessarily CSS rules for the animation start
    // We define them here (not in the CSS file) to owerwrite the google styles

    // Calculate starting height to make a transition
    // From heightStart to '0px'
    const startingHeight = this.getSearchResultHeight(firstResultEl);

    firstResultEl.style.setProperty("--starting-height", `${startingHeight}px`);
    firstResultEl.style.setProperty("margin-bottom", "0");
    firstResultEl.classList.add("fade-out");

    setTimeout(() => {
      firstResultEl.remove();
      this.updateButtonState();
      this.isDeleting = false; // set to false when the animation is finished
    }, FADE_OUT_TIME);
  }

  render() {
    // Check if sidebar exists
    if (this.rcnt.children.length === 2) {
      this.rcnt.lastElementChild?.prepend(this.button);
      return;
    }

    // Otherwise, create our own and put our button as a child
    const newSidebar = document.createElement("div");
    newSidebar.classList.add("new-sidebar");
    newSidebar.appendChild(this.button);
    rcntEl?.appendChild(newSidebar);
  }
}

// Define fade out time and set CSS variable for fade-out animation
const FADE_OUT_TIME = 400;
document.body.style.setProperty("--fade-out-duration", `${FADE_OUT_TIME / 1000}s`);

// element with search results list and possible sidebar search results
const rcntEl = document.querySelector("#rcnt") as HTMLDivElement;

if (rcntEl) {
  const deleteButton = new DeleteButton(rcntEl);
  deleteButton.render();
}
