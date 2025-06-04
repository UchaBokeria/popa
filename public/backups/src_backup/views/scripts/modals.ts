export function modalData() {
  return {
    isOpen: false,
    modalTitle: '',
    modalContent: '',

    openModal(title: string, content: string) {
      this.modalTitle = title;
      this.modalContent = content;
      this.isOpen = true;
    },

    closeModal() {
      this.isOpen = false;
    },
  };
}
