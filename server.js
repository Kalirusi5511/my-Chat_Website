const express = require('express');
const app = express();
const messages = []; // Ein Array, das die Nachrichten speichert

// Funktion zum Löschen von Nachrichten
function deleteMessage(messageId, userRole) {
    if (userRole === 'owner') {
        const messageIndex = messages.findIndex(msg => msg.id === messageId);
        if (messageIndex !== -1) {
            messages.splice(messageIndex, 1);
            return "Nachricht erfolgreich gelöscht.";
        } else {
            return "Nachricht nicht gefunden.";
        }
    } else {
        return "Nur der Owner darf alle Nachrichten löschen.";
    }
}

// Beispiel-Route zum Löschen einer Nachricht
app.delete('/message/:id', (req, res) => {
    const messageId = req.params.id;
    const userRole = req.headers['user-role']; // Role wird im Header übergeben
    const result = deleteMessage(messageId, userRole);
    res.send(result);
});

app.listen(3000, () => {
    console.log('Server läuft auf Port 3000');
});
