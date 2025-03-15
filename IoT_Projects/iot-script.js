function copyCode() {
    const codeElement = document.querySelector("#arduino-code pre code");
    navigator.clipboard.writeText(codeElement.innerText)
        .then(() => alert("✅ Code copied successfully!"))
        .catch(() => alert("❌ Failed to copy!"));
}




// Sidebar Toggle
const toggleSidebar = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");

toggleSidebar.addEventListener("click", () => {
    if (sidebar.classList.contains("-translate-x-64")) {
        gsap.to(sidebar, { x: 0, duration: 0.3 });
        sidebar.classList.remove("-translate-x-64");
    } else {
        gsap.to(sidebar, { x: -256, duration: 0.3, onComplete: () => sidebar.classList.add("-translate-x-64") });
    }
});

// Smooth Scrolling with Navbar Offset
document.querySelectorAll('aside a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); 

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const navbarHeight = document.querySelector("nav").offsetHeight; 
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - navbarHeight - 20; 

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("comments")) {
        addFixedComments();
    }
    loadComments();
});

function addComment() {
    let username = document.getElementById("username").value.trim() || "Anonymous";
    let commentInput = document.getElementById("commentInput");
    let commentText = commentInput.value.trim();
    let profilePic = document.getElementById("profilePic").files[0];
    if (commentText === "") return;

    let reader = new FileReader();
    reader.onload = function (event) {
        let profilePicUrl = profilePic ? event.target.result : "default-profile.png";
        let timestamp = new Date().toLocaleString();
        let commentData = { username, commentText, profilePicUrl, timestamp, replies: [] };

        saveComment(commentData);
        displayComment(commentData);
        commentInput.value = "";
    };

    if (profilePic) {
        reader.readAsDataURL(profilePic);
    } else {
        let commentData = { username, commentText, profilePicUrl: "default-profile.png", timestamp: new Date().toLocaleString(), replies: [] };
        saveComment(commentData);
        displayComment(commentData);
        commentInput.value = "";
    }
}

function saveComment(commentData) {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push(commentData);
    localStorage.setItem("comments", JSON.stringify(comments));
}

function loadComments() {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.forEach(displayComment);
}

function addFixedComments() {
    let fixedComments = [
        { username: "Abhijit", commentText: "Great project! Looking forward to updates.", profilePicUrl: "/Project-IoT/assets/abhi.jpg", timestamp: new Date().toLocaleString(), replies: [] },
        { username: "Prolayjit", commentText: "Amazing work! Keep it up!", profilePicUrl: "/Project-IoT/assets/prob.jpeg", timestamp: new Date().toLocaleString(), replies: [
            { username: "Agnick", commentText: "I agree! This is inspiring!", profilePicUrl: "default-profile.png", timestamp: new Date().toLocaleString() }
        ] }
    ];
    fixedComments.forEach(displayComment);
}

function displayComment(commentData) {
    let commentList = document.getElementById("commentList");
    let commentDiv = document.createElement("div");
    commentDiv.classList.add("bg-gray-200", "p-4", "rounded-lg", "shadow");
    commentDiv.innerHTML = `
        <div class="flex items-center mb-2">
            <img src="${commentData.profilePicUrl}" class="w-10 h-10 rounded-full mr-2">
            <div>
                <span class="font-bold">${commentData.username}</span>
                <span class="text-sm text-gray-500">${commentData.timestamp}</span>
            </div>
        </div>
        <p class="mb-2" contenteditable="false">${commentData.commentText}</p>
        <div class="flex space-x-2">
            <button onclick="likeComment(this)" class="text-red-500">❤️ (<span>0</span>)</button>
            <button onclick="editComment(this)" class="bg-green-500 text-white px-2 py-1 rounded">Edit</button>
            <button onclick="deleteComment(this)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            <button onclick="replyComment(this)" class="bg-yellow-500 text-white px-2 py-1 rounded">Reply</button>
        </div>
        <div class="ml-6 mt-2 reply-box"></div>
    `;
    commentList.appendChild(commentDiv);
}

function likeComment(button) {
    let likeCount = button.querySelector("span");
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
}

function editComment(button) {
    let commentText = button.parentElement.previousElementSibling;
    if (commentText.isContentEditable) {
        commentText.contentEditable = false;
        button.textContent = "Edit";
        updateCommentInStorage(commentText);
    } else {
        commentText.contentEditable = true;
        commentText.focus();
        button.textContent = "Save";
    }
}

function updateCommentInStorage(commentElement) {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    let commentText = commentElement.textContent.trim();
    let username = commentElement.previousElementSibling.querySelector(".font-bold").textContent;

    let updatedComments = comments.map(comment => {
        if (comment.username === username) {
            comment.commentText = commentText;
        }
        return comment;
    });

    localStorage.setItem("comments", JSON.stringify(updatedComments));
}

function deleteComment(button) {
    if (confirm("Are you sure you want to delete this comment?")) {
        let commentDiv = button.parentElement.parentElement;
        let username = commentDiv.querySelector(".font-bold").textContent;
        let commentText = commentDiv.querySelector("p").textContent.trim();

        let comments = JSON.parse(localStorage.getItem("comments")) || [];
        let filteredComments = comments.filter(comment => !(comment.username === username && comment.commentText === commentText));
        localStorage.setItem("comments", JSON.stringify(filteredComments));

        commentDiv.remove();
    }
}

function replyComment(button) {
    let replyBox = button.parentElement.nextElementSibling;
    let replyInput = document.createElement("textarea");
    let replyButton = document.createElement("button");
    replyButton.textContent = "Post Reply";
    replyButton.classList.add("bg-yellow-500", "text-white", "px-2", "py-1", "rounded", "mt-2");
    replyButton.onclick = function () {
        let replyText = replyInput.value.trim();
        if (replyText === "") return;
        let replyDiv = document.createElement("div");
        replyDiv.classList.add("bg-gray-300", "p-2", "rounded-lg", "mt-2", "flex", "justify-between");
        replyDiv.innerHTML = `<p>${replyText}</p> <button onclick="this.parentElement.remove()" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>`;
        replyBox.appendChild(replyDiv);
        replyInput.remove();
        replyButton.remove();
    };
    replyBox.appendChild(replyInput);
    replyBox.appendChild(replyButton);
}