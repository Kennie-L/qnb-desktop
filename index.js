addEventListener('input', () => {
  if (document.getElementById("rid").value === "") {
    document.getElementById('submitBtn').disabled = true;
  } else {
    document.getElementById('submitBtn').disabled = false;
  }
});
addEventListener('submit', async (event) => {
  event.preventDefault();
  document.getElementById("rid").disabled = true;
  document.getElementById("submitBtn").disabled = true;
  const rid = document.getElementById("rid").value;
  if (rid) await window.api.openWindow({url: rid.trim()});
});