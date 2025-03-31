//Code Copy

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

// Function to open image in fullscreen mode
function zoomImage(imgElement) {
    const overlay = document.getElementById("imageOverlay");
    const zoomedImg = document.getElementById("zoomedImg");
    zoomedImg.src = imgElement.src;
    overlay.classList.add("active");
}

// Function to close fullscreen image
function closeZoom() {
    document.getElementById("imageOverlay").classList.remove("active");
}




document.addEventListener("DOMContentLoaded", function () {
    addFixedComments();
    loadProjectComments();
});

// Define fixed comments for different projects
const fixedComments = {
    "agricultural": [
        { 
            username: "Arghya Roy", 
            commentText: "Great project! Looking forward to updates.", 
            profilePicUrl: "../assets/arghya.jpg", 
            timestamp: new Date().toLocaleString(), 
            replies: [
                { username: "Ankan Bhowmik", commentText: "Absolutely! This looks promising!", profilePicUrl: "../assets/ankan.jpg", timestamp: new Date().toLocaleString() }
            ]
        },
        { 
            username: "Abhijit Dutta", 
            commentText: "Amazing work! Keep it up!", 
            profilePicUrl: "../assets/abhi.jpg", 
            timestamp: new Date().toLocaleString(),
            replies: []
        }
    ],
    "project2": [
        { 
            username: "Snehasish", 
            commentText: "This is a game-changer! Can't wait to try it.", 
            profilePicUrl: "/assets/sneh.jpg", 
            timestamp: new Date().toLocaleString(), 
            replies: [
                { username: "Arghya", commentText: "Agreed! This innovation is impressive.", profilePicUrl: "/assets/arghya.jpg", timestamp: new Date().toLocaleString() }
            ]
        }
    ],
    "project3": [
        { 
            username: "Ankan", 
            commentText: "Impressive work! Any plans to add new features?", 
            profilePicUrl: "/assets/ankan.jpg", 
            timestamp: new Date().toLocaleString(),
            replies: []
        },
        { 
            username: "Anchit", 
            commentText: "This project has huge potential!", 
            profilePicUrl: "/assets/anchit.jpg", 
            timestamp: new Date().toLocaleString(),
            replies: [
                { username: "Debopam", commentText: "Absolutely! I can see this being widely used.", profilePicUrl: "/assets/debo.jpg", timestamp: new Date().toLocaleString() }
            ]
        }
    ]
};

// Load predefined comments based on the project
function addFixedComments() {
    const projectId = document.body.getAttribute("data-project-id");
    const comments = fixedComments[projectId] || [];

    comments.forEach(comment => displayComment(comment));
}

// Load stored comments dynamically for each project
function loadProjectComments() {
    const projectId = document.body.getAttribute("data-project-id");
    const storedComments = JSON.parse(localStorage.getItem(`comments-${projectId}`)) || [];

    storedComments.forEach(comment => displayComment(comment));
}

// Function to add a new comment
function addComment() {
    const projectId = document.body.getAttribute("data-project-id");
    const username = document.getElementById("username").value.trim();
    const commentText = document.getElementById("commentInput").value.trim();
    const profilePic = document.getElementById("profilePreview").src;

    if (username === "" || commentText === "") {
        alert("Please fill in both name and comment!");
        return;
    }

    const comment = {
        username,
        commentText,
        profilePicUrl: profilePic,
        timestamp: new Date().toLocaleString(),
        replies: []
    };

    displayComment(comment);
    
    // Store in local storage
    const storedComments = JSON.parse(localStorage.getItem(`comments-${projectId}`)) || [];
    storedComments.push(comment);
    localStorage.setItem(`comments-${projectId}`, JSON.stringify(storedComments));

    // Reset input fields
    document.getElementById("username").value = "";
    document.getElementById("commentInput").value = "";
    document.getElementById("profilePreview").src = "assets/default-avatar.png";
}

// Function to display a comment in the comment section
function displayComment(commentData, parentDiv = null) {
    const commentList = parentDiv || document.getElementById("commentList");
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("bg-gray-100", "p-4", "rounded-lg", "shadow-md", "mt-3");

    commentDiv.innerHTML = `
        <div class="flex items-center mb-2">
            <img src="${commentData.profilePicUrl}" class="w-10 h-10 rounded-full mr-2">
            <div>
                <span class="font-bold">${commentData.username}</span>
                <span class="text-sm text-gray-500">${commentData.timestamp}</span>
            </div>
        </div>
        <p class="mb-2">${commentData.commentText}</p>
        <div class="flex space-x-2">
            <button onclick="replyComment(this)" class="bg-yellow-500 text-white px-2 py-1 rounded">Reply</button>
            <button onclick="deleteComment(this)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </div>
        <div class="ml-6 mt-2 reply-box"></div>
    `;

    commentList.appendChild(commentDiv);

    // If comment has replies, display them
    if (commentData.replies && commentData.replies.length > 0) {
        const replyBox = commentDiv.querySelector(".reply-box");
        commentData.replies.forEach(reply => displayComment(reply, replyBox));
    }
}

// Function to reply to a comment
function replyComment(button) {
    const replyBox = button.parentElement.nextElementSibling;
    const replyInput = document.createElement("input");
    replyInput.type = "text";
    replyInput.placeholder = "Write a reply...";
    replyInput.classList.add("p-2", "border", "rounded", "w-3/4");

    const submitReply = document.createElement("button");
    submitReply.textContent = "Post Reply";
    submitReply.classList.add("bg-blue-500", "text-white", "px-2", "py-1", "rounded", "ml-2");
    submitReply.onclick = function () {
        const replyText = replyInput.value.trim();
        if (replyText !== "") {
            const replyData = {
                username: "Anonymous",
                commentText: replyText,
                profilePicUrl: "assets/default-avatar.png",
                timestamp: new Date().toLocaleString(),
                replies: []
            };
            displayComment(replyData, replyBox);
            replyInput.remove();
            submitReply.remove();
        }
    };

    replyBox.appendChild(replyInput);
    replyBox.appendChild(submitReply);
}

// Function to delete a comment
function deleteComment(button) {
    button.parentElement.parentElement.remove();
}

// Profile picture preview function
function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function () {
        document.getElementById("profilePreview").src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}
