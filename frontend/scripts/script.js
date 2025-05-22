const BASE_URL = "http://localhost:4000";

// Cek apakah user sudah login
async function checkAuth() {
  const response = await fetch(`${BASE_URL}/token`, {
    credentials: "include",
  });

  if (!response.ok) {
    // Belum login → redirect ke halaman login
      console.log("Token tidak valid. Redirect ke login.html");
    window.location.href = "login.html";
  } else {
    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken); // simpan token sementara
  }
}


document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!username || !password) {
        alert("Username dan password tidak boleh kosong.");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
          alert(`Login gagal: ${data.message || response.statusText}`);
          return;
        }

        localStorage.setItem("accessToken", data.accessToken);
        alert("Login berhasil!");
        window.location.href = "index.html";
      } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat login.");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!username || !password || !email) {
        alert("Semua field harus diisi.");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            username,
            password
          })
        });

        if (!response.ok) {
          const err = await response.json();
          alert(`Registrasi gagal: ${err.message || response.statusText}`);
          return;
        }

        alert("Registrasi berhasil. Silakan login.");
        window.location.href = "login.html";
      } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat registrasi.");
      }
    });
  }
});


document.addEventListener("DOMContentLoaded", async function () {
  const currentPage = window.location.pathname;

  // Hanya cek token jika bukan di halaman login atau register
  if (!currentPage.includes("login.html") && !currentPage.includes("register.html")) {
    await checkAuth();
    const notesContainer = document.getElementById("notesContainer");
    fetchNotes();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        const response = await fetch(`${BASE_URL}/logout`, {
          method: "DELETE",
          credentials: "include", // Hapus cookie refresh token
        });

        if (response.ok) {
          localStorage.removeItem("accessToken"); // Hapus access token
          alert("Berhasil logout.");
          window.location.href = "login.html";
        } else {
          alert("Gagal logout.");
        }
      } catch (error) {
        console.error("Logout error:", error);
        alert("Terjadi kesalahan saat logout.");
      }
    });
  }
});

async function fetchNotes() {
  const token = localStorage.getItem("accessToken");
  notesContainer.innerHTML = '<p class="text-center">Memuat catatan...</p>';

  try {
    const response = await fetch(`${BASE_URL}/getnotes`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Gagal mengambil catatan: ${response.statusText}`);
    }

    const notes = await response.json();
    notesContainer.innerHTML = ""; 

    if (notes.length === 0) {
      notesContainer.innerHTML = '<p class="text-center">Belum ada catatan.</p>';
    } else {
      notes.forEach((note) => {
        const noteCard = document.createElement("div");
        noteCard.classList.add("card", "w-100", "mb-3");

        noteCard.innerHTML = `
              <div class="card-body">
                <h5 class="card-title">${note.title}</h5>
                <p class="card-text">${note.content}</p>
                <button class="btn btn-outline-primary edit-btn" data-id="${note.id}">Edit</button>
                <button class="btn btn-outline-danger delete-btn" data-id="${note.id}">Hapus</button>
              </div>
            `;

        notesContainer.appendChild(noteCard);
      });

      document.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
          const noteId = event.target.getAttribute("data-id");
          window.location.href = `edit_note.html?id=${noteId}`;
        });
      });

      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
          const noteId = event.target.getAttribute("data-id");
          deleteNote(noteId);
        });
      });
    }
  } catch (error) {
    console.error("Error:", error);
    notesContainer.innerHTML = '<p class="text-danger text-center">Gagal mengambil catatan.</p>';
  }
}

// Fungsi untuk menyimpan catatan baru
async function saveNote() {
  const titleInput = document.getElementById("title");
  const kontenInput = document.getElementById("konten");

  const title = titleInput.value.trim();
  const content = kontenInput.value.trim();
  const token = localStorage.getItem("accessToken");

  if (title === "" || content === "") {
    alert("Judul dan Konten tidak boleh kosong!");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      throw new Error("Gagal menyimpan catatan");
    }

    alert("Catatan berhasil disimpan!");
    titleInput.value = "";
    kontenInput.value = "";
    fetchNotes();
  } catch (error) {
    console.error("Error:", error.message); 
    alert(`Gagal menambahkan catatan. ${error.message}`);
  }
}

async function updateNote(noteId) {
  const titleInput = document.getElementById("title");
  const kontenInput = document.getElementById("konten");

  const title = titleInput.value.trim();
  const content = kontenInput.value.trim();
  const token = localStorage.getItem("accessToken");

  if (title === "" || content === "") {
    alert("Judul dan Konten tidak boleh kosong!");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      throw new Error("Gagal memperbarui catatan");
    }

    alert("Catatan berhasil diperbarui!");
    titleInput.value = "";
    kontenInput.value = "";
    window.location.href = "index.html"; 
  } catch (error) {
    console.error("Error:", error.message);
    alert(`Gagal memperbarui catatan. ${error.message}`);
  }
  
}

async function deleteNote(noteId) {
  if (!confirm("Apakah Anda yakin ingin menghapus catatan ini?")) return;

  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Gagal menghapus catatan: ${response.statusText}`);
    }

    alert("Catatan berhasil dihapus.");
    fetchNotes();
  } catch (error) {
    console.error("Error:", error);
    alert("Gagal menghapus catatan.");
  }
}
