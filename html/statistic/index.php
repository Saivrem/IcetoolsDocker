<?php
include($_SERVER['DOCUMENT_ROOT'] . "/icetoolsContent/php/Helper.php");
$direction = $_GET['direction'] === null ? 'asc' : $_GET['direction'];
$field = $_GET['field'] === null ? 'available' : $_GET['field'];
$result = Helper::sortData(Helper::prepareFlagField((new Helper())->getStatistic()), $field, $direction);
?>
<!DOCTYPE html>
<html lang="EN">
<head>
    <title>Dashboard</title>
    <link rel='stylesheet' type='text/css' href='/icetoolsContent/styles/statistic.css'>
    <link rel='shortcut icon' href='/icetoolsContent/mediaAssets/favicon.ico' type='image/x-icon'>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
          rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
          crossorigin="anonymous">
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light bg-info text-center">
    <a class="navbar-brand" style="margin: 5px;" href="https://icecat.biz">
        <img src="/icetoolsContent/mediaAssets/home.png" width="50px" height="50px" alt="home.png">
    </a>
    <form class="form-inline">
        <button class="navbtn btn btn-light" type="button" onclick="top.location.href='https://icecat.biz'">Launchpad</button>
    </form>
</nav>
<div class="container">
    <div id="table">
        <table class='table table-striped text-center'>
            <thead class='table-primary table-bordered table-sm'>
            <tr>
                <th scope='col' class='align-middle'><?= Helper::getSortingIcon('langCode', $direction, $field) ?><u>Lang
                        code</u><?= '</a>' ?>
                </th>
                <th scope='col' class='align-middle'><?= Helper::getSortingIcon('repository', $direction, $field) ?>
                    <u>Repository</u><?= '</a>' ?>
                </th>
                <th scope='col' class='align-middle'><?= Helper::getSortingIcon('type', $direction, $field) ?>
                    <u>Type</u><?= '</a>' ?>
                </th>
                <th scope='col' class='align-middle'><?= Helper::getSortingIcon('available', $direction, $field) ?>
                    <u>Status</u><?= '</a>' ?>
                </th>
                <th scope='col' class='align-middle'><?= Helper::getSortingIcon('lastModified', $direction, $field) ?>
                    <u>Timestamp</u><?= '</a>' ?>
                </th>
            </tr>
            </thead>
            <tbody id="statTable" class="table table-sm table-borderless">

            <?php
            foreach ($result as $value) {
                ?>
                <tr>
                    <td class="align-middle"><?= $value['langCode'] ?></td>
                    <td class="align-middle"><?= $value['repository'] ?></td>
                    <td class="align-middle"><?= $value['type'] ?></td>
                    <td class="align-middle"><img
                                src="/icetoolsContent/mediaAssets/<?= Helper::printIcon($value['available']) ?>"
                                width="25" height="25" alt=""></td>
                    <td class="align-middle"><?= $value['lastModified'] ?></td>
                </tr>
                <?php
            }
            ?>
            </tbody>
        </table>
    </div>
</div>
<?= Helper::getFooter() ?>
</body>
</html>