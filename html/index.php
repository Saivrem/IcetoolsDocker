<?php
include($_SERVER['DOCUMENT_ROOT'] . "/php/Helper.php");

$languages = Helper::languages();
uasort($languages, function ($a, $b) {
    return strcmp($a['langName'], $b['langName']);
});

$checkboxNames = [
    'title', 'gallery', 'related',
    'featurelogos', 'productstory', 'image',
    'essentialinfo', 'marketingtext', 'variants',
    'bulletpoints', 'reasonstobuy', 'generalinfo',
    'videos', 'tours3d', 'manuals',
    'featuregroups', 'reviews', 'selectAll'
];
$inputElements = [
    'username' => 'openicecat-live',
    'appkey' => '',
    'mpn' => '5587-9709',
    'brand' => "Dell",
    'ean' => '5397184119709',
    'productId' => '56195846',
    'language' => '',
    'output' => ''
]
?>

<!DOCTYPE html>
<html lang='EN'>

<head>
    <title>Launchpad</title>
    <link rel='shortcut icon' href='favicon.ico' type='image/x-icon'>

    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <meta charset='UTF-8'>

    <!-- Stylesheets -->
    <link rel='stylesheet' type='text/css' href='styles/index.css'>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
          rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
          crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="styles/json-viewer.css">

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
            crossorigin="anonymous"></script>

    <!-- External script files -->
    <script src="js/json-viewer.js"></script>
    <script src='js/logic.js'></script>

</head>

<body>

<!-- Nav Bar -->
<nav class='navbar navbar-expand-lg navbar-light bg-info text-center'>
    <div class="col">
        <a class="navbar-brand" href="https://icecat.biz"><img src="mediaAssets/home.png" width="50px" height="50px"
                                                               alt="home.png"></a>
    </div>
    <div class="col">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown btn btn-light menubtn" id="indexDropdown">
                <div class="nav-link dropdown-toggle" role="button"
                     data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Index Files
                </div>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="indexDropdownBody">
                </div>
            </li>
            <li class="nav-item dropdown btn btn-light menubtn">
                <div class="nav-link dropdown-toggle" id="refDropdown" role="button"
                     data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Ref Files
                </div>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="refDropdownBody">
                </div>
            </li>
            <li class="nav-item dropdown btn btn-light menubtn">
                <div class="nav-link dropdown-toggle" id="documents" role="button"
                     data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Documents
                </div>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="documentsBody">
                </div>
            </li>
        </ul>
    </div>
    <div class="col">
        <div class='button-row' style="vertical-align: middle; margin: 2px;">
            <div class="btn-group btn-group-toggle" data-bs-toggle="buttons"
                 style="vertical-align: middle;">
                <label class="btn btn-light active " for="Open">
                    <input type="radio" name="repo" id="Open" autocomplete="off" checked> Open
                </label>
                <label class="btn btn-light" for="Full">
                    <input type="radio" name="repo" id="Full" autocomplete="off"> Full
                </label>
            </div>

            <button type="button" class="btn btn-light btn-nav headerbtn" data-bs-toggle="modal"
                    data-bs-target="#shareModal">
                Share
            </button>
            <button onclick='top.location.href="uploads"' class='btn btn-light btn-nav headerbtn'>Uploads</button>
            <button class="btn btn-light btn-nav headerbtn" type="button"
                    onclick="top.location.href='/statistic/'">Status
            </button>
            <button class='btn btn-danger btn-nav headerbtn' id='clear' type='button'>Clear</button>
        </div>
    </div>
</nav>


<div class='container'>
    <div class="row">
        <div class='col' style="margin-top: 2px;">
            <div class="container-fluid">
                <?php foreach ($inputElements as $key => $value) {
                    $counter = 0;
                    $type = $key === 'appkey' ? 'password' : 'text';
                    ?>
                    <div class=' input-group mb-3'>
                        <div class='input-group-prepend'>
                            <span class='input-group-text minWidth'
                                  id='<?= $key . $counter ?>'><?= ucfirst($key) ?></span>
                        </div>
                        <?php if ($key === 'language') { ?>
                            <select id='lang' name='lang' class="form-select">
                                <?php foreach ($languages as $language) { ?>
                                    <option value="<?= $language['langCode'] ?>"><?= ucwords($language["langName"]) ?></option>
                                <?php } ?>
                            </select>
                            <script type="text/javascript">
                                document.getElementById("lang").value = 'EN';
                            </script>
                        <?php } else if ($key === 'output') { ?>
                            <select class='form-select' id='output'>
                                <option value='productxml'>Product XML</option>
                                <option value='metaxml'>Meta XML</option>
                                <option value='productcsv'>Product CSV</option>
                            </select>
                        <?php } else { ?>
                        <input type='<?= $type ?>' class='form-control' id='<?= $key ?>' name='<?= $key ?>'
                               placeholder='<?= ucfirst($key) ?>'
                               aria-label='<?= ucfirst($key) ?>'
                               aria-describedby='<?= $key . $counter ?>'
                               value='<?= $value ?>'>
                        <?php } ?>
                    </div>
                    <?php $counter++;
                } ?>
            </div>
        </div>

        <div class='col' style="margin-top: 2px;">
            <div class="container-fluid">
                <?php foreach (array_chunk($checkboxNames, 3) as $chunk) { ?>
                    <div class="row">
                        <?php foreach ($chunk as $element) { ?>
                            <div class="col">
                            <div class="toggleBox">
                                <input type='checkbox' class="btn-check" id='<?= $element . 'Check' ?>'
                                       autocomplete="off">
                                <label class="btn btn-outline-info" for='<?= $element . 'Check' ?>'
                                       style="margin: 2px; width: 140px;"><?= ucwords($element) ?></label>
                            </div>
                            </div><?php
                        }
                        ?>
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col my-auto text-center">
            <div class="container-fluid">
                <div class="radButtons">
                    <div class="btn-group btn-group-toggle" data-bs-toggle="buttons">
                        <label class="btn btn-info active mpn">
                            <input type="radio" name="options" id="mpnRadio" autocomplete="off" checked> Brand+MPN
                        </label>
                        <label class="btn btn-info ean">
                            <input type="radio" name="options" id="eanRadio" autocomplete="off"> EAN/UPC
                        </label>
                        <label class="btn btn-info prodId">
                            <input type="radio" name="options" id="productIdRadio" autocomplete="off"> Product ID
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="col my-auto text-center">
            <div class="container-fluid">
                <div class="btn-group" role="group" aria-label="JSON-Label">
                    <button class='btn btn-info menubtn splitButton' id='jsoncall' type='button'>
                        JPreview
                    </button>
                    <button class='btn btn-info menubtn splitButton' id='jsoncall2' type='button'>
                        JSON call
                    </button>
                </div>
                <button class='btn btn-info menubtn' id='xmls3' type='button'>XML_S3 Call</button>
                <div class="btn-group" role="group" aria-label="LiveFull-Label">
                    <button class='btn btn-info menubtn splitButton' id='liveFullRequest' type='button'>
                        Live Full
                    </button>
                    <button class='btn btn-info menubtn splitButton' id='LiveFullGetCode' type='button'
                            data-bs-toggle="modal" data-bs-target="#getCodeModal">
                        Get code
                    </button>
                </div>
                <button class='btn btn-info menubtn' id='foRequest' type='button' disabled>FO Request</button>
                <div class="btn-group" role="group" aria-label="LiveFull-Label">
                    <button class='btn btn-info menubtn splitButton' id='granularSubmit' type='button'>
                        Live Gran. call
                    </button>
                    <button class='btn btn-info menubtn splitButton' id='liveGranularGetCode' type='button'
                            data-bs-toggle="modal" data-bs-target="#getCodeModal">
                        Get code
                    </button>
                </div>
                <button class='btn btn-info menubtn' id="copyLinkButton" type='button'>Copy Link</button>
            </div>
        </div>
    </div>
</div>

<div class='mainContainer' id='content'>
    <p>Buttons on the right could be used for Live or JSON granular requests. Live granular has dedicated button,
    <p>To make JSON granular call just mark a checkbox and press JSON call button;
    <p>JSON preview will render JSON directly on the page.
    <p>Product identifiers could be following: <B>Brand + MPN</B> <i>or</i> <B>EAN code</B> <i>or</i> <B>Product ID</B>.
    <p>To share the link press corresponding button, if you've performed some requests before - the link will be<BR>
        with action parameter, else it will contain only the page settings.
</div>

<div id="popUp" style="display: none; text-align: center;">
    <div id="popUpContent"></div>
</div>

<div id="copyBox" style="visibility: hidden;"></div>

<template id="liveDiv">
    <div class="container-fluid" id="Live">
        <div class="row">
            <div class="row">
                <div id='title' style="width: 100%;"></div>
                <div class="col-sm">
                    <div id='gallery' style="position: relative; float: left"></div>
                </div>
                <div class="col-sm">
                    <div id='essentialinfo'></div>
                    <div id='manuals'></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="container-fluid">
                <div id='featurelogos'></div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <div id='marketingtext'></div>
                <div id='bulletpoints'></div>
                <div id='videos'></div>
                <div id='tours3d'></div>
                <div id='productstory'></div>
                <div id='reasonstobuy'></div>
            </div>
            <div class="col-sm">
                <div id='featuregroups'></div>
            </div>
        </div>
        <div class="row">
            <div id='reviews'></div>
        </div>
    </div>
</template>
<script src='https://live.icecat.biz/js/live-current-2.js'></script>

<?php
//file uploader
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_FILES['files'])) {
        $errors = [];
        $path = 'uploads/';
        $extensions = ['csv', 'xls', 'xlsx', 'docx', 'doc'];

        $all_files = count($_FILES['files']['tmp_name']);

        for ($i = 0; $i < $all_files; $i++) {
            $file_name = $_FILES['files']['name'][$i];
            $file_tmp = $_FILES['files']['tmp_name'][$i];
            $file_type = $_FILES['files']['type'][$i];
            $file_size = $_FILES['files']['size'][$i];
            $array = explode('.', $_FILES['files']['name'][$i]);
            $file_ext = strtolower(end($array));

            $file = $path . $file_name;


            if (!in_array($file_ext, $extensions)) {
                $errors[] = 'Extension not allowed: ' . $file_name . ' ' . $file_type;
            }

            if ($file_size > 20971520) {
                $errors[] = 'File size exceeds limit: ' . $file_name . ' ' . $file_type;
            }

            if (empty($errors)) {
                move_uploaded_file($file_tmp, $file);
            }
        }

        if ($errors) {
            print_r($errors);
        }
    }
} ?>
<div class="modal" id="shareModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="shareModalLabel">File uploader</h5>
                <button style="width: 80px;" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Please be informed that uploads folder is purged every day!<br>
                <p>Accepted file formats:<br>
                <p><b>csv, xls, xlsx, docx, doc</b><br>
                <form method="post" enctype="multipart/form-data">
                    <div class="custom-file">
                        <input type="file" name="files[]" multiple class="form-control-file" id="customFile"
                               accept=".csv, .xls, .xlsx, .docx, .doc">
                        <label class="custom-file-label" for="customFile">Choose file < 20 Mb </label>
                    </div>
                    <div class="col text-center">
                        <button class="btn-primary btn fixed text-center" style="margin-top: 5px;" type="submit">Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="getCodeModal" tabindex="-1">
    <div class="modal-dialog" style="min-width: 50%;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Live request code snippet</h5>
            </div>
            <code class="modal-body" id="getCodeModalBody" style="white-space: break-spaces">
                ...
            </code>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<script>
    $(".custom-file-input").on("change", function () {
        let fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });
</script>
<?= Helper::getFooter() ?>
</body>
</html>
