document.addEventListener("DOMContentLoaded", function () {
  const notesContainer = document.getElementById("notesContainer");

  fetchNotes();
});

async function fetchNotes() {
  notesContainer.innerHTML = '<p class="text-center">Memuat catatan...</p>';

  try {
    const response = await fetch("https://be-809626753173.us-central1.run.app/notes");

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

  console.log(title, content);

  if (title === "" || content === "") {
    alert("Judul dan Konten tidak boleh kosong!");
    return;
  }

  try {
    const response = await fetch("https://be-809626753173.us-central1.run.app/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    alert("Catatan berhasil disimpan!");
    titleInput.value = "";
    kontenInput.value = "";
    fetchNotes();
  } catch (error) {
    console.error("Error:", error.message); 
    alert(`Gagal menambahkan catatan. ${error.message}`);
  }
}

async function updateNote() {
  const urlParams = new URLSearchParams(window.location.search);
  const noteId = urlParams.get("id");
  if (!noteId) {
    alert("Update Gagal, ID Invalid.");
    return;
  }

  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("konten");

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title === "" || content === "") {
    alert("Judul dan konten tidak boleh kosong!");
    return;
  }

  try {
    const response = await fetch(`https://be-809626753173.us-central1.run.app/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      throw new Error("Gagal memperbarui catatan.");
    }

    alert("Catatan berhasil diperbarui!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan saat memperbarui catatan.");
  }
}

async function deleteNote(noteId) {
  if (!confirm("Apakah Anda yakin ingin menghapus catatan ini?")) return;

  try {
    const response = await fetch(`https://be-809626753173.us-central1.run.app/notes/${noteId}`, {
      method: "DELETE",
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
