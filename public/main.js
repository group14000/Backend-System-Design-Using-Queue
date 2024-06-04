const apiUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (window.location.pathname.endsWith("login.html")) {
    document
      .getElementById("login-form")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        try {
          const response = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });
          const data = await response.json();
          if (response.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = "index.html";
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error("Error logging in:", error);
        }
      });
  } else if (window.location.pathname.endsWith("register.html")) {
    document
      .getElementById("register-form")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        try {
          const response = await fetch(`${apiUrl}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });
          const data = await response.json();
          if (response.ok) {
            alert("Registration successful. Please login.");
            window.location.href = "login.html";
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error("Error registering:", error);
        }
      });
  } else if (window.location.pathname.endsWith("index.html")) {
    if (!token) {
      window.location.href = "login.html";
    } else {
      document.getElementById("logout-button").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "login.html";
      });

      document
        .getElementById("task-form")
        .addEventListener("submit", async (event) => {
          event.preventDefault();
          const task = document.getElementById("task-input").value;
          try {
            const response = await fetch(`${apiUrl}/task`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ task }),
            });
            const data = await response.json();
            if (response.ok) {
              const taskList = document.getElementById("task-list");
              const listItem = document.createElement("li");
              listItem.textContent = task;
              taskList.appendChild(listItem);
              document.getElementById("task-input").value = "";
            } else {
              alert(data.message);
            }
          } catch (error) {
            console.error("Error adding task:", error);
          }
        });

      // Load existing tasks (if any)
      (async () => {
        try {
          const response = await fetch(`${apiUrl}/tasks`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const tasks = await response.json();
          const taskList = document.getElementById("task-list");
          tasks.forEach((task) => {
            const listItem = document.createElement("li");
            listItem.textContent = task;
            taskList.appendChild(listItem);
          });
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      })();
    }
  }
});
