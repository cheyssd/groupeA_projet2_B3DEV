<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Facture</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .box {
            margin-bottom: 15px;
        }
    </style>
</head>
<body>

<div class="header">
    <h2>EcoWork</h2>
    <p>Facture de réservation</p>
</div>

<div class="box">
    <strong>Client :</strong> {{ $reservation->user->firstname }} {{ $reservation->user->lastname }}<br>
    <strong>Email :</strong> {{ $reservation->user->email }}
</div>

<div class="box">
    <strong>Espace :</strong> {{ $reservation->space->name }}<br>
    <strong>Date début :</strong> {{ $reservation->start_date }}<br>
    <strong>Date fin :</strong> {{ $reservation->end_date }}
</div>

<div class="box">
    <strong>Total :</strong> {{ number_format($reservation->total_price, 2) }} FCFA
</div>

<hr>

<p>Merci pour votre confiance.</p>

</body>
</html>
