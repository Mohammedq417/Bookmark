document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submitBtn");
  const tableContent = document.getElementById("tableContent");
  const bookmarkName = document.getElementById("bookmarkName");
  const bookmarkURL = document.getElementById("bookmarkURL");
  const errorBox = document.querySelector(".box-info");
  const closeBtn = document.getElementById("closeBtn");

  let bookmarks = [];

  function validateInput(name, url) {
    const urlPattern =
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]{2,}\.[a-z]{2,}([\/\w-]*)*$/;
    return name.length >= 3 && urlPattern.test(url);
  }

  function formatURL(url) {
    if (!/^https?:\/\//.test(url)) {
      return "https://" + url;
    }
    return url;
  }

  function renderTable() {
    tableContent.innerHTML = "";
    bookmarks.forEach((bookmark, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
          <td>${index + 1}</td>
          <td>${bookmark.name}</td>
          <td><a href="${
            bookmark.url
          }" target="_blank" class="btn btn-primary">Visit</a></td>
          <td><button class="btn btn-danger" onclick="deleteBookmark(${index})">Delete</button></td>
        `;

      tableContent.appendChild(row);
    });
  }

  function addBookmark() {
    const name = bookmarkName.value.trim();
    let url = bookmarkURL.value.trim();

    if (!validateInput(name, url)) {
      showErrorBox();
      return;
    }

    url = formatURL(url);

    bookmarks.push({ name, url });
    renderTable();

    bookmarkName.value = "";
    bookmarkURL.value = "";
  }

  function showErrorBox() {
    errorBox.classList.remove("d-none");
  }

  closeBtn.addEventListener("click", () => {
    errorBox.classList.add("d-none");
  });

  window.deleteBookmark = function (index) {
    bookmarks.splice(index, 1);
    renderTable();
  };

  submitBtn.addEventListener("click", addBookmark);
});
