import axios from 'axios';
// import { Table } from '@ckeditor/ckeditor5-table';

export const editorConfig = {
    toolbar: [
      'undo', 'redo', 
      '|',
      'heading', '|',
      'bold', 'italic', 'underline' ,'strikethrough', 'subscript', 'superscript', 'code', 
      '|',
      'link', 'insertImage', 'blockQuote', 'codeBlock', 
      '|',
      'alignment', '|',
      'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
      '|',
      'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor',
      '|',
      'table',
      '|',
      'emoji'
    ],
    image: {
      toolbar: [
        'imageTextAlternative', '|',
        'imageStyle:inline', 'imageStyle:block', 'imageStyle:side', '|',
        'linkImage'
      ]
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    },
    extraPlugins: [MyCustomImageUploadAdapterPlugin],
  };
  
  function MyCustomImageUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyCustomUploadAdapter(loader);
    };
  }
  
  class MyCustomUploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }
  
    upload() {
      return new Promise((resolve, reject) => {
        const data = new FormData();
        data.append('file', this.loader.file);
        axios.post('YOUR_IMAGE_UPLOAD_URL', data)
          .then(response => {
            resolve({
              default: response.data.imageUrl
            });
          })
          .catch(error => reject('Upload failed: ' + error));
      });
    }
  
    abort() {
      console.log('Upload aborted');
    }
  }