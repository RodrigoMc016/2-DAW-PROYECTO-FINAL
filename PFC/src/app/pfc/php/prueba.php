<?php
$url = 'https://api.stripe.com/v1/checkout/sessions';

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);

if ($response === false) {
    echo "cURL error: " . curl_error($ch);
} else {
    echo "Connected to Stripe!";
}

curl_close($ch);
