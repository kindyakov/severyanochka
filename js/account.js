const account__tabs = document.querySelectorAll('.account-tabs');
const account__preview = document.querySelectorAll('.account__tab-preview');
function activeTab() {
  account__preview.forEach((preview, i) => {
    preview.classList.remove('active');
    account__tabs[i].classList.remove('active');
    if (this.dataset.account === preview.dataset.account) {
      preview.classList.add('active');
      this.classList.add('active');
    }
  })
}
account__tabs.forEach(tab => tab.addEventListener('click', activeTab));