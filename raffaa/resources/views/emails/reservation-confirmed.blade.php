<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body style="font-family: Arial">

<h2>Votre réservation est confirmée </h2>

<p>
Espace : <strong>{{ $reservation->space->name }}</strong>
</p>

<p>
Du {{ $reservation->start_date }}
au {{ $reservation->end_date }}
</p>

<p>
Total : {{ $reservation->total_price }} FCFA
</p>

</body>
</html>
