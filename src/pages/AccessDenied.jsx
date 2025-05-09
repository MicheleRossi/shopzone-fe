export default function AccessDenied() {
    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>Accesso Negato</h1>
            <p>Non hai i permessi necessari per accedere a questa pagina.</p>
            <p>Questa pagina è riservata agli utenti con ruolo di amministratore.</p>
        </div>
    );
}