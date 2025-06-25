// tinymce core
import 'tinymce/tinymce';

// theme dan icons
import 'tinymce/themes/silver';
import 'tinymce/icons/default';

// PLUGINS (yang masih support di TinyMCE 7+)
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/codesample';

// skin (agar tampilan editor tidak kosong)
import 'tinymce/skins/ui/oxide/skin.min.css';

const tinymceFullConfig = {
  base_url: '/tinymce',
  suffix: '.min',
  height: 400,
  menubar: true,
  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons',
    'codesample', 'pagebreak', 'visualchars', 'nonbreaking'

  ],
  toolbar:
    'undo redo | blocks fontfamily fontsize | ' +
    'bold italic underline strikethrough forecolor backcolor | ' +
    'alignleft aligncenter alignright alignjustify | ' +
    'bullist numlist outdent indent | link image media emoticons | ' +
    'table codesample pagebreak | removeformat preview code fullscreen help',
  automatic_uploads: true,
  file_picker_types: 'image media',
  media_live_embeds: true,
  media_alt_source: false,
  media_poster: false,
  media_filter_html: false,
  image_caption: true,
  content_style:
    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

  file_picker_callback: function (callback, value, meta) {
    if (meta.filetype === 'image' || meta.filetype === 'media') {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', meta.filetype === 'image' ? 'image/*' : 'video/*');
      input.onchange = function () {
        const file = this.files[0];
        const reader = new FileReader();
        reader.onload = function () {
          const id = 'blobid' + new Date().getTime();
          const blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
          const base64 = reader.result.split(',')[1];
          const blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);
          callback(blobInfo.blobUri(), { title: file.name });
        };
        reader.readAsDataURL(file);
      };
      input.click();
    }
  }
};

export default tinymceFullConfig;
