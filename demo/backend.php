<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>HTML5</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <?php
          //echo $_POST['name'];
          //var_dump($_FILES);

          foreach($_FILES as $files){
            upload($files);
          }
          
          function upload($files) {
            foreach($files['tmp_name'] as $key => $tmp_name) {
              if (strlen($tmp_name) > 0) {
                $file_name = $files['name'][$key];
                $file_size = $files['size'][$key];
                $file_tmp = $files['tmp_name'][$key];
                $file_type= $files['type'][$key];  
  
                $detectedType = exif_imagetype($file_tmp);
                $path = 'uploads/' . $file_name;
                
                if ($detectedType) {
                  // save image to disk
                  move_uploaded_file($file_tmp, $path);
                  echo '<p><img src="' . $path . '" /></p>';
                }
              }
            }
          }
        ?>
    </body>
</html>
