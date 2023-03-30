class Modal {
  constructor({ name, html, btnActive, btnClose, closeArea,
    insertHTML = document.querySelector('.wrapper') }) {
    this.modal = false
    this.isModal = false;
    this.isCreate = true;
    this.modalName = name;
    this.modalInsertHTML = insertHTML;
    this.modalHtml = html;
    this.modalActive = btnActive;
    this.modalClose = btnClose;
    this.modalCloseBody = closeArea;
    this.hendleClick()
  }
  hendleClick() {
    document.addEventListener('click', e => {
      if (e.target.closest(`${this.modalActive}`)) {
        if (this.isCreate) {
          this.createModal()
          this.isCreate = false;
        }
        this.open()
      }
      if (!this.isModal) return;
      if (e.target.classList.contains(`${this.modalCloseBody}`) || e.target.closest(`${this.modalClose}`)) {
        this.close()
      }
    })
    document.addEventListener('keyup', e => {
      if (e.key !== 'Escape') return
      this.close()
    })
  }
  createModal() {
    this.modalInsertHTML.insertAdjacentHTML('beforeend', this.modalHtml)
    this.modal = document.querySelector(`${this.modalName}`);
    this.isModal = true;
  }
  open() {
    this.addPadding()
    this.modal.classList.add('active');
    document.body.classList.add('lock');
    document.querySelector('html').classList.add('lock');
  }
  close() {
    this.modalInsertHTML.style.cssText = ``;
    this.modal.classList.remove('active');
    document.body.classList.remove('lock');
    document.querySelector('html').classList.remove('lock');
  }
  atimate() { }
  addPadding() {
    const document_width = document.documentElement.clientWidth;
    const window_width = window.innerWidth;
    const wrapper_margin = window_width - document_width;

    if (wrapper_margin > 0) this.modalInsertHTML.style.cssText = `padding-right: ${wrapper_margin}px;`;
  }
}

export default Modal;