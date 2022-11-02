// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
// https://stackoverflow.com/questions/5632629/how-to-change-a-file-inputs-filelist-programmatically/68182158#68182158

/*
 * @name          fileSelector.js
 * @version       0.0.1
 * @lastmodified  2022-11-01
 * @author        Saeid Mohadjer
 * @repo		      https://github.com/smohadjer/fileSelector
 *
 * Licensed under the MIT License
 */

import FileManager from './fileManager.js';

'use strict';

export default class FileSelector {
	constructor(options) {
      this.myForm = options.form;
      this.inputs = this.myForm.querySelectorAll('input[type=file]');
      this.error = this.myForm.querySelector('.error');
    
      /*
      this.myForm.addEventListener('submit', event => {
        event.preventDefault();
        this.submitHandler(this.myForm);
      });
      */

      this.inputs.forEach((input) => {
        const myComponent = 
            `<div class="myComponent">
                <div class="drop_zone">
                    <span class="prompt">Drag files or <a href="">Browse</a></span>
                </div> 
                <ul class="file-manager"></ul>
            </div>`;
        const doc = new DOMParser().parseFromString(myComponent, 'text/html');
        const myComp = doc.body.firstChild;
        input.after(myComp);
        input.setAttribute('hidden', 'hidden');
        myComp.querySelector('.drop_zone').appendChild(input);
        this.init(myComp);
      });
  }

  showError(error) {
    error.removeAttribute('hidden');
  }

  hideError(error) {
    error.setAttribute('hidden', 'hidden');
  }

  init(myComponent) {
    const dropZone = myComponent.querySelector('.drop_zone');
    const hiddenFileInput = dropZone.querySelector('input[hidden]');
    const browseButton = dropZone.querySelector('a');
    const fileManagerElement = myComponent.querySelector('.file-manager');
    const fileManager = new FileManager({
       input: hiddenFileInput,
       element: fileManagerElement,
       hideError: this.hideError,
       error: this.error
    });
    const dropHandler = (event) => {
      event.preventDefault();
      event.target.classList.remove('dragging');
      fileManager.add(event.dataTransfer.files);
    };
    const dragOverHandler = (event) => {
      event.preventDefault();
    };
    const dragEnterHandler = (event) => {
      event.preventDefault();
      event.target.classList.add('dragging');
    };
    const dragLeaveHandler = (event) => {
      event.preventDefault();
      event.target.classList.remove('dragging');
    };
    dropZone.addEventListener('drop', dropHandler);
    dropZone.addEventListener('dragover', dragOverHandler);
    dropZone.addEventListener('dragenter', dragEnterHandler);
    dropZone.addEventListener('dragleave', dragLeaveHandler);
    dropZone.addEventListener('dragend', dragLeaveHandler);
    browseButton.addEventListener('click', event => {
      event.preventDefault();
      hiddenFileInput.click();
    });
  
    hiddenFileInput.addEventListener('change', (event) => {
      fileManager.add(event.target.files);
    });

    fileManagerElement.addEventListener('click', (event) => {
        if (event.target.nodeName === 'BUTTON') {
          fileManager.remove(event.target.closest('li'));          
        }
    });
  }

  /*
  submitHandler(myForm) {
    const formData = new FormData(myForm);

    // remove files that are uploaded in the form
    for (var key of formData.entries()) {
      if (key[0] === 'myfiles[]') {
        formData.delete('myfiles[]');
      }
    }

    // add files stored in fileManager to formData
    if (fileManager.data && fileManager.data.length) {
      for (var i=0; i<fileManager.data.length; i++) {
        const file = fileManager.data[i];
        formData.append('myfiles[]', file);
      }
    } else {
      this.showError(error);
      return;
    }

    fetch(myForm.getAttribute('action'), {
        method: myForm.getAttribute('method'),
        body: formData
    })
    .then(() => { 
      alert(fileManager.data.length + ' files were uploaded!');
      fileManager.data = [];
      fileManagerElement.innerHTML = '';
    })
    .catch(() => { console.log('Error'); });
  }
  */
}

