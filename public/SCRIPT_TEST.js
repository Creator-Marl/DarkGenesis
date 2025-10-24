// --- Gestion des onglets ---
function openTab(event, tabName) {
    event.preventDefault();

    const tabContents = document.querySelectorAll(".tab-content");
    tabContents.forEach(tab => (tab.style.display = "none"));

    const tabLinks = document.querySelectorAll(".tab-link");
    tabLinks.forEach(btn => btn.classList.remove("active"));

    const activeTab = document.getElementById(tabName);
    if (activeTab) activeTab.style.display = "block";

    event.currentTarget.classList.add("active");
}

// --- Gestion des formulaires ---
document.addEventListener("DOMContentLoaded", () => {
    /* === Formulaire d'inscription (Tab1) === */
    const signupForm = document.querySelector("#Tab1 form");
    if (signupForm) {
        signupForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const username = document.querySelector("#username").value.trim();
            const email = document.querySelector("#email").value.trim();
            const password = document.querySelector("#password").value.trim();
            const confirmPassword = document.querySelector("#confirm-password").value.trim();

            if (!username || !email || !password || !confirmPassword) {
                alert("Veuillez remplir tous les champs.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Les mots de passe ne correspondent pas.");
                return;
            }

            try {
                const response = await fetch("/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, email, password })
                });

                if (!response.ok) throw new Error("Erreur serveur");
                const data = await response.json();

                console.log("Inscription réussie :", data);
                alert("Inscription réussie ! Bienvenue dans Dark-Genesis.");
                signupForm.reset();
            } catch (error) {
                console.error("Erreur :", error);
                alert("Erreur lors de l'inscription. Réessaie plus tard.");
            }
        });
    }

    /* === Formulaire de connexion (Tab2) === */
    const loginForm = document.querySelector("#Tab2 form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const email = document.querySelector("#login-email").value.trim();
            const password = document.querySelector("#login-password").value.trim();

            if (!email || !password) {
                alert("Veuillez remplir tous les champs.");
                return;
            }

            try {
                const response = await fetch("/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                if (!response.ok) throw new Error("Erreur serveur");
                const data = await response.json();

                console.log("Connexion réussie :", data);
                alert("Connexion réussie ! Heureux de te revoir !");
                loginForm.reset();
            } catch (error) {
                console.error("Erreur :", error);
                alert("Erreur lors de la connexion. Vérifie tes identifiants ou réessaie plus tard.");
            }
        });
    }
});
