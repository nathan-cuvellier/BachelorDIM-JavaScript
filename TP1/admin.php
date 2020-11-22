<?php
session_start();


if(!isset($_SESSION['auth'])) {
    die('pas connecté');
}

echo "Connecté";
