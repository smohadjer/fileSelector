export default class FileManager {
    constructor(options) {
        this.input = options.input;
        this.element = options.element;
        this.data = [];
        this.hideError = options.hideError;
        this.error = options.error;
    }

    bytesToSize(bytes) {
        return Math.round(bytes * 100 / (1024 * 1024)) /100 + ' MB';
    }

    add(files) {
        for (var i = 0; i < files.length; i++) {
            let fileExists = false;
            const fileName = files[i].name;
    
            for (var j = 0; j < this.data.length; j++) {
              const file = this.data[j];
              if (file.name === fileName) {
                fileExists = true;
                this.data[j] = files[i];
                break;
              }
            }
    
            if (!fileExists) {
              this.data.push(files[i]);
              this.hideError(this.error);
            }
          }  
          this.updateMarkup();
          this.updateInputField();
    }

    updateInputField() {
      const dataTransfer = new DataTransfer()

      for (var i = 0; i < this.data.length; i++) {
        const file = this.data[i];
        dataTransfer.items.add(file);
      }

      this.input.files = dataTransfer.files;
    }

    remove(element) {
        element.remove();
        const fileName = element.querySelector('.name').textContent;

        for (var i = 0; i < this.data.length; i++) {
          const file = this.data[i];
          if (file.name === fileName) {
            this.data.splice(i, 1); 
          }
        }

        this.updateInputField();
    }

    updateMarkup() {
        this.element.innerHTML = '';
        for (var i = 0; i < this.data.length; i++) {
          const file = this.data[i];
          const entry = document.createElement('li');
          const fileData = `<div><span class="name">${file.name}</span> (<span class="size">${this.bytesToSize(file.size)}</span>)</div><img class="delete" src="trash.svg" alt="Delete" />`;
          entry.innerHTML = fileData;
          this.element.appendChild(entry);
        }  
    }
}

