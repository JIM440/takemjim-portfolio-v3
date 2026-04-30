async function test() {
  console.log("Fetching /api/blogs...");
  const res = await fetch("http://localhost:3000/api/blogs");
  console.log("Status:", res.status);
  const json = await res.json();
  console.log("Data:", json);
}
test();
