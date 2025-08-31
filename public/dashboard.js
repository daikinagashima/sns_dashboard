async function loadInsights() {
  const accountId = document.getElementById('accountId').value || 'default';
  const res = await fetch(`/api/insights?accountId=${encodeURIComponent(accountId)}`);
  const data = await res.json();
  document.getElementById('followers').textContent = data.followers;
  document.getElementById('engagement').textContent = data.engagement;
  document.getElementById('likes').textContent = data.likes;
  document.getElementById('comments').textContent = data.comments;
}

document.getElementById('load').addEventListener('click', loadInsights);
loadInsights();
